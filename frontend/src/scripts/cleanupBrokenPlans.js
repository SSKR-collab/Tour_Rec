import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Plan from "../models/plan.js";

// Compute project root
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const cleanBrokenPlans = async () => {
	const mongoUri = process.env.MONGO_URI;

	if (!mongoUri) {
		console.error("❌ MONGO_URI not found in .env file.");
		process.exit(1);
	}

	try {
		await mongoose.connect(mongoUri);
		console.log("✅ Connected to MongoDB");

		const brokenPlans = await Plan.find({ "selectedPlaces.place": null });

		for (const plan of brokenPlans) {
			plan.selectedPlaces = plan.selectedPlaces.filter((sp) => sp.place !== null);
			await plan.save();
			console.log(`🧹 Cleaned plan: ${plan._id}`);
		}

		console.log("✅ Done cleaning broken selectedPlaces.");
		process.exit(0);
	} catch (err) {
		console.error("❌ Error cleaning plans:", err);
		process.exit(1);
	}
};

cleanBrokenPlans();
