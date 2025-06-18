import dotenv from "dotenv";
dotenv.config();

import express from "express";

import authRouter from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import recommendationRoute from "./routes/recommendationRoute.js";
import tourPlanRoute from "./routes/tourPlanRoute.js";

const app = express();
const PORT = process.env.PORT || 5002;

// Verify environment variables
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
if (!apiKey) {
	console.error("❌ GOOGLE_MAPS_API_KEY is not set in .env file");
	process.exit(1);
}
console.log("✅ GOOGLE_MAPS_API_KEY is set:", apiKey.substring(0, 10) + "...");

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/plan", tourPlanRoute);
app.use("/api/recommend", recommendationRoute);

await connectDB();
app.listen(PORT, () => {
	console.log("server started on port :", PORT);
});

//mongodb+srv://lakhveers:sS52qVPeLF9hCcyT@cluster0.kihe7bi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
