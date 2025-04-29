import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

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

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
    const token = generateToken(user._id.toString());
    return res.status(200).json({ user, token });
  } catch (err) {
    throw err; // Will be caught by global error handler
  }
};

