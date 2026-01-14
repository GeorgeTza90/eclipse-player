import { Router } from "express";
import { getSongs } from "../controllers/playerController";

const router = Router();

router.get("/", getSongs);

export default router;
