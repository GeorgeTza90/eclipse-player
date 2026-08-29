import { Router } from "express";
import { verifyToken } from "@/middleware/authMiddleware.js";
import { createRateLimiter } from "@/middleware/rateLimiter.js";
import { validateBody, validateQuery } from "@/middleware/validate.js";
import { createPlaySchema, statsRangeSchema } from "@/validation/plays.schema.js";
import { recordPlay, getMyStats } from "@/controllers/plays.controller.js";

const router = Router();

// Rate limiters (min/max)
const recordPlayLimiter = createRateLimiter(1, 20);

router.use(verifyToken);

router.post("/", recordPlayLimiter, validateBody(createPlaySchema), recordPlay);
router.get("/stats", validateQuery(statsRangeSchema), getMyStats);

export default router;