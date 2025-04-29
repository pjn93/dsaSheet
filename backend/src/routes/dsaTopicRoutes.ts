import express from 'express';
import { getAllTopics, updateSubtopicStatus } from '../controllers/dsaTopicController';
import { errorHandler } from '../error-handler';
import authenticateToken from '../middleware/authMiddleware';

const dsaTopicRouter = express.Router();

dsaTopicRouter.get('/dsa', authenticateToken, errorHandler(getAllTopics));

dsaTopicRouter.put('/:topicId/subtopics/:subtopicId', errorHandler(updateSubtopicStatus));

export default dsaTopicRouter;
