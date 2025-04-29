import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the Item schema
const itemSchema = new Schema({
  _id: String,  // force _id to be a string (e.g., "1", "2")
  name: { type: String, required: true },
  leetcode: String,
  youtube: String,
  article: String,
  level: String,
  status: String,
});

// Define the Item interface
export interface IItem extends Types.Subdocument {
  _id: string;
  name: string;
  leetcode: string;
  youtube: string;
  article: string;
  level: string;
  status: string;
}

// Define the Topic interface
export interface ITopic extends Document {
  category: string;
  items: Types.DocumentArray<IItem>; // Use DocumentArray for .id() support
}

// Define the Topic schema
const topicSchema = new Schema<ITopic>({
  category: { type: String, required: true },
  items: [itemSchema], // Embed items
});

// Export the model
const Topic = mongoose.model<ITopic>('Topic', topicSchema);
export default Topic;