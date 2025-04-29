import { Router } from 'express';
import { getAllTopics, updateItemStatus } from '../controllers/topicControllers';
import { errorHandler } from '../error-handler';
import authenticateToken from '../middleware/authMiddleware';

const topicRoutes: Router = Router();

// Apply authenticateToken middleware before the route handler
topicRoutes.get('/topics', authenticateToken, errorHandler(getAllTopics));
topicRoutes.put('/:topicId/items/:itemId', authenticateToken, errorHandler(updateItemStatus));


export default topicRoutes;