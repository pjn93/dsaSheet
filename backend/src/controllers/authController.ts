import { Request, Response } from "express";
import User from "../models/User";
import generateToken from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ fullName, email, password });
    const token = generateToken(newUser._id.toString());

    return res.status(201).json({ user: newUser, token });
  } catch (err) {
    throw err;  // This will be caught by the error handler
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email is not registered. Please sign up." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user._id.toString());
    return res.status(200).json({ user, token });
  } catch (err) {
    throw err; // Will be caught by global error handler
  }
};

