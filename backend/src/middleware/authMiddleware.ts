import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw res.status(403).json({ message: 'Access denied, no token provided.' });
  }

  try {
    // Verify token using your secret key (ensure to match with your .env or config)
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();  // Call next() to move to the next middleware/route handler
  } catch (error) {
    throw res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticateToken;
