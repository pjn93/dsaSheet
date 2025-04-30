import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import topicRoutes from "./routes/topicRoutes";
import dsaTopicRouter from "./routes/dsaTopicRoutes";
import connectDB from "./config/db";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Configure CORS middleware to allow requests from your frontend domain
const corsOptions = {
  origin: '*',  // Allow requests from your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

  // Routes
app.use("/api/users", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/dsaTopics", dsaTopicRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
