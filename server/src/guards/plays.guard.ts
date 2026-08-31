import { Play } from "@/types/plays.types.js";
import { Ensure } from "@/utils/ensure.js";

export function ensurePlayCreated(play: Play[]) {
    Ensure.that(play.length > 0, "PLAY_NOT_FOUND", 500);
}