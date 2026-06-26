import { ResultSetHeader } from "mysql2";
import { Ensure } from "../utils/ensure.js";

export function ensurePresetExists(result: ResultSetHeader) {
    Ensure.that(result.affectedRows > 0, "PRESET_NOT_FOUND", 404);
}