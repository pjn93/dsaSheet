import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import topicRoutes from "./routes/topicRoutes";
import dsaTopicRouter from "./routes/dsaTopicRoutes";
import connectDB from "./config/db";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

  // Routes
app.use("/api/users", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/dsaTopics", dsaTopicRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});