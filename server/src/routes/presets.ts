import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { createRateLimiter }  from '../middleware/rateLimiter';
import { createPresets, deletePresets, getPresets, updatePresets } from "../controllers/presetsController";

const router = Router();

router.use(verifyToken);

// Rate limiters (soft limit)
const createPresetsLimiter = createRateLimiter(1, 30);
const deletePresetsLimiter = createRateLimiter(1, 30);

// Presets CRUD
router.get("/", getPresets);
router.post("/", createPresetsLimiter,createPresets);
router.put("/:id", updatePresets);
router.delete("/:id", deletePresetsLimiter, deletePresets);

export default router;