import express from "express";
import { signup, getUserProfile, logout, logIn, adminSignUp } from "../controllers/user.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js"; // Import middleware

const router = express.Router();

router.post("/new-user", signup); // Public route
router.post('/login', logIn); // Public route
router.get('/userprofile', authenticateUser, getUserProfile); // Protected route
router.post('/logout', logout);
router.post('/new-admin', adminSignUp)

export default router;
