import { Request, Response } from 'express';
import DSATopics from '../models/DsaTopicModel';

export const getAllTopics = async (req: Request, res: Response) => {
  try {
    const topics = await DSATopics.find();
    console.log(topics,'topics')

    res.status(200).json(topics);
  } catch (error) {
    console.log(error,'errror')
    res.status(500).json({ message: 'Error fetching topics', error });
  }
};

export const updateSubtopicStatus = async (req: Request, res: Response) => {
  const { topicId, subtopicId } = req.params;
  const { status } = req.body;

  if (!["Pending", "Done"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedTopic = await DSATopics.findOneAndUpdate(
      { _id: topicId, "subtopics._id": subtopicId },
      { $set: { "subtopics.$.status": status } },
      { new: true }
    );

    if (!updatedTopic) {
      return res.status(404).json({ message: "Topic or subtopic not found" });
    }

    res.status(200).json(updatedTopic);
  } catch (error) {
    res.status(500).json({ message: "Failed to update subtopic status", error });
  }
};