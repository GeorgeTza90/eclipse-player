import { Router } from "express";
import { getSongs, getPrivateSongs } from "../controllers/playerController";

const router = Router();

router.get("/", getSongs);
router.get("/private", getPrivateSongs);

export default router;
