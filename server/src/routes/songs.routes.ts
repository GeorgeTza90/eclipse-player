import { Router } from "express";
import { getSongs, getPrivateSongs } from "../controllers/songs.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

// Public routes
router.get("/", getSongs);

// Protected routes
router.use(verifyToken)
router.get("/private", getPrivateSongs);

export default router;
