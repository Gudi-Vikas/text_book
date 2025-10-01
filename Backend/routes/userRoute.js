import express from 'express';
import { loginUser, registerUser, getCurrentUser } from '../controllers/userController.js';
// import { verifyToken } from '../middleware/auth.js';

const userRouter = express.Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected routes
// userRouter.get("/me", verifyToken, getCurrentUser);

export default userRouter;