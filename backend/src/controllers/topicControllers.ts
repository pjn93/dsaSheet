import { NextFunction, Request, Response } from "express";
import Topic from "../models/Topic";

// Get all topics
export const getAllTopics = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find();  
    res.status(200).json(topics);  
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topics', error });
  }
};


export const updateItemStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { topicId, itemId } = req.params;

  const topic = await Topic.findById(topicId);
  if (!topic) {
    return res.status(404).json({ message: 'Topic not found' });
  }

  const item = topic.items.id(itemId);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  item.status = req.body.status || 'Done';  // Make sure you are receiving the correct status
  await topic.save();

  res.status(200).json({ message: 'Item status updated to Done', updatedItem: item });
};
