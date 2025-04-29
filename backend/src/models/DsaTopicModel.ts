import mongoose, { Schema, Document } from 'mongoose';

// Define the Subtopic interface with the correct type for status
export interface Subtopic {
  _id: string; // _id should be a string as per your data
  name: string;
  leetcode: string;
  youtube: string;
  article: string;
  level: string;
  status: "Done" | "Pending"; // Restrict status to only "Done" or "Pending"
}

// Define the DSATopic interface which extends Document
export interface DSATopicDocument extends Document {
  name: string;
  subtopics: Subtopic[];
}

// Subtopic Schema
const SubtopicSchema: Schema = new Schema({
  _id: { type: String, required: true }, // _id should be string
  name: { type: String, required: true },
  leetcode: { type: String, required: true },
  youtube: { type: String, required: true },
  article: { type: String, required: true },
  level: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['Done', 'Pending'], // Restricting the possible values for status
    default: 'Pending' // Default value for status
  }
});

// DSATopic Schema
const DSATopicSchema: Schema = new Schema({
  name: { type: String, required: true },
  subtopics: { type: [SubtopicSchema], required: true }
});

// Model for DSATopics collection
export default mongoose.model<DSATopicDocument>('DSATopics', DSATopicSchema, 'dsaTopics');
