import { Router } from "express";
import { signup, login } from "../controllers/authController";
import { errorHandler } from "../error-handler";

const authRoutes: Router = Router();

// Wrap the signup and login handlers with errorHandler
authRoutes.post("/signup", errorHandler(signup));
authRoutes.post("/login", errorHandler(login));

export default authRoutes;
