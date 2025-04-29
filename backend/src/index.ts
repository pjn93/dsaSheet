import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import topicRoutes from "./routes/topicRoutes";
import dsaTopicRouter from "./routes/dsaTopicRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/dsaTopics", dsaTopicRouter);

// Global error handler
app.use((err: any, req: Request, res: Response) => {
  console.error("Global error:", err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI as string, {
  serverSelectionTimeoutMS: 30000,
})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
