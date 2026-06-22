import { AppError } from "../errors/AppError.js";
import { ResultSetHeader } from "mysql2";

export function ensurePresetExists(result: ResultSetHeader) {
    if (result.affectedRows === 0) throw new AppError("PRESET_NOT_FOUND", 404);
}