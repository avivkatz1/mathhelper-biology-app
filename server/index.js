import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { biologyUserRoutes } from "./routes/biologyUserRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? [
        "https://biology-app.vercel.app",
        "https://aqueous-eyrie-54478.herokuapp.com"
      ]
    : ["http://localhost:3002", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
biologyUserRoutes(app);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "Biology App API" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`Biology App server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
