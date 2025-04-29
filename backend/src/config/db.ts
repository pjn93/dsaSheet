import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Loads environment variables from .env file (if locally)

const connectDB = async () => {
  try {
    // Using the environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process if the connection fails
  }
};

export default connectDB;
