import express from "express";
import { signup, getUserProfile } from "../controllers/user.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js"; // Import middleware

const router = express.Router();

router.post("/new-user", signup); // Public route
router.get('/userprofile', authenticateUser, getUserProfile); // Protected route

router.get("/protected-route", authenticateUser, (req, res) => {
    res.json({ message: "Access granted!", userId: req.userId });
});

export default router;
