import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { seedPlaces } from "./services/seedHelper.js";
import { connectDB } from "./config/db.js";

await connectDB();
await seedPlaces({
	lat: 26.9124,
	lng: 75.7873,
	city: "Jaipur",
	preferences: ["fort", "museum", "temple", "park"],
});

mongoose.disconnect();
