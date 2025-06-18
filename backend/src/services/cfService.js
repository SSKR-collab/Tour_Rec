import Plan from "../models/plan.js";
import Place from "../models/place.js";
import User from "../models/user.js";
import similarity from "../utils/similarity.js";
import { seedPlacesAround } from "./seedHelper.js";
// Haversine distance in km
const haversine = (loc1, loc2) => {
	const R = 6371;
	const toRad = (deg) => (deg * Math.PI) / 180;
	const dLat = toRad(loc2.lat - loc1.lat);
	const dLon = toRad(loc2.lng - loc1.lng);
	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRad(loc1.lat)) * Math.cos(toRad(loc2.lat)) * Math.sin(dLon / 2) ** 2;
	return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/**
 *  hybridRecommend(userId, limit)
 * Collaborative + Content-Based Recommender (global, not location-aware)
 */
export const hybridRecommend = async (userId, limit = 5) => {
	const user = await User.findById(userId);
	if (!user) throw new Error("User not found");

	// const preferences = user.preferences || {};
	const placeTypesPref = user.preferences || [];

	// Build user → place matrix
	const plans = await Plan.find().populate("selectedPlaces.place", "placeId");
	const userVisits = {};
	const allPlaceIds = new Set();
	// console.log(plans);
	plans.forEach((plan) => {
		const uid = plan.user.toString();
		userVisits[uid] ??= new Set();
		plan.selectedPlaces.forEach((entry) => {
			if (entry.place && entry.place.placeId) {
				userVisits[uid].add(entry.place.placeId);
				allPlaceIds.add(entry.place.placeId);
			}
		});
	});

	const allPlaceArr = [...allPlaceIds];
	const currentUserVec = allPlaceArr.map((pid) => (userVisits[userId]?.has(pid) ? 1 : 0));

	const cfScores = new Map();

	Object.entries(userVisits).forEach(([uid, visited]) => {
		if (uid === userId) return;
		const vec = allPlaceArr.map((pid) => (visited.has(pid) ? 1 : 0));
		const sim = similarity.cosine(currentUserVec, vec);
		visited.forEach((pid) => {
			if (!userVisits[userId]?.has(pid)) {
				cfScores.set(pid, (cfScores.get(pid) || 0) + sim);
			}
		});
	});
	// console.log(cfScores);
	const placeDocs = await Place.find();
	const cbScores = new Map();

	for (const place of placeDocs) {
		let score = 0;
		if (placeTypesPref.length && place.types) {
			const match = place.types.filter((t) => placeTypesPref.includes(t));
			score = match.length / placeTypesPref.length;
		}
		cbScores.set(place.placeId, score);
	}
	// console.log(cbScores);
	const finalScores = new Map();
	const weightCF = 0.7;
	const weightCB = 0.3;

	for (const place of placeDocs) {
		const pid = place.placeId;
		const cf = cfScores.get(pid) || 0;
		const cb = cbScores.get(pid) || 0;

		const score = weightCF * cf + weightCB * cb;
		if (score > 0) finalScores.set(pid, { score, place });
	}

	return [...finalScores.values()]
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map((p) => p.place);
};

/**
 * 📍 hybridRecommendWithLocation({ userId, lat, lng, radius, limit })
 * Hybrid recommender limited to places near lat/lng
 */
export const hybridRecommendWithLocation = async ({
	userId,
	lat,
	lng,
	radius = 5000,
	limit = 5,
}) => {
	const user = await User.findById(userId);
	if (!user) throw new Error("User not found");

	const placeTypesPref = user.preferences || [];

	/* ---------------- CF PREP ---------------- */
	const plans = await Plan.find().populate("selectedPlaces.place", "placeId");
	const userVisits = {};
	const allPlaceIds = new Set();

	plans.forEach((plan) => {
		const uid = plan.user.toString();
		userVisits[uid] ??= new Set();
		plan.selectedPlaces.forEach((entry) => {
			if (entry.place?.placeId) {
				userVisits[uid].add(entry.place.placeId);
				allPlaceIds.add(entry.place.placeId);
			}
		});
	});

	const allPlaceArr = [...allPlaceIds];
	const currentUserVec = allPlaceArr.map((pid) => (userVisits[userId]?.has(pid) ? 1 : 0));

	const cfScores = new Map();
	Object.entries(userVisits).forEach(([uid, visited]) => {
		if (uid === userId) return;
		const vec = allPlaceArr.map((pid) => (visited.has(pid) ? 1 : 0));
		const sim = similarity.cosine(currentUserVec, vec);
		visited.forEach((pid) => {
			if (!userVisits[userId]?.has(pid)) {
				cfScores.set(pid, (cfScores.get(pid) || 0) + sim);
			}
		});
	});

	/* ---------------- CB + LOCATION ---------------- */
	const placeDocs = await Place.find();
	const cbScores = new Map();
	const location = { lat, lng };

	// ❗ make mutable
	let nearbyPlaces = placeDocs.filter((p) => haversine(location, p.location) <= radius);

	if (nearbyPlaces.length === 0) {
		console.log("🌍 Auto‑seeding new city from Geoapify…");
		try {
			const seeded = await seedPlacesAround({
				lat,
				lng,
				city: user.location?.city || "Unknown",
			});
			if (seeded.length > 0) {
				nearbyPlaces = seeded; // ← works now (let, not const)
			} else {
				console.warn("⚠️ No places found via Geoapify.");
			}
		} catch (error) {
			console.error("❌ Auto‑seed failed:", error.message);
		}
	}

	for (const place of nearbyPlaces) {
		let score = 0;
		if (placeTypesPref.length && place.types) {
			const match = place.types.filter((t) => placeTypesPref.includes(t));
			score = match.length / placeTypesPref.length;
		}
		cbScores.set(place.placeId, score);
	}

	/* ---------------- Combine scores ---------------- */
	const finalScores = new Map();
	const hasHistory = !!userVisits[userId]?.size;
	const weightCF = hasHistory ? 0.7 : 0; // cold‑start: ignore CF
	const weightCB = hasHistory ? 0.3 : 1; // rely fully on CB if no history

	for (const place of nearbyPlaces) {
		const pid = place.placeId;
		const cf = cfScores.get(pid) || 0;
		const cb = cbScores.get(pid) || 0;
		const score = weightCF * cf + weightCB * cb;
		if (score > 0) finalScores.set(pid, { score, place });
	}

	/* ---------------- Fallback if still empty -------- */
	let ranked =
		finalScores.size > 0
			? [...finalScores.values()].sort((a, b) => b.score - a.score)
			: nearbyPlaces
					.map((p) => ({ place: p, rating: p.rating || 0 }))
					.sort((a, b) => b.rating - a.rating);

	return ranked.slice(0, limit).map((x) => x.place);
};
