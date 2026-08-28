// guards/plays.guard.ts
import { Ensure } from "../utils/ensure.js";
import { Play } from "../types/plays.types.js";

export function ensurePlayCreated(play: Play | undefined): asserts play is Play {
    Ensure.exists(play, "PLAY_NOT_FOUND", 500);
}