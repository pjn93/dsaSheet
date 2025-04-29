// src/error-handler.ts

import { Request, Response, NextFunction } from "express";

export const errorHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);  // Automatically catch async errors
  };
};
