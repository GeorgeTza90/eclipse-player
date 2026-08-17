import { logger } from "./logger";

/* ---------------- GET ---------------- */
export function getBool(key: string, fallback: boolean = false): boolean {
    try {
        const v = localStorage.getItem(key);
        if (v === "true") return true;
        if (v === "false") return false;
        return fallback;
    } catch {
        return fallback;
    }
}

export function getJSON<T>(key: string, fallback: T): T {
    try {
        const v = localStorage.getItem(key);
        return v ? (JSON.parse(v) as T) : fallback;
    } catch {
        return fallback;
    }
}

/* ---------------- SET ---------------- */
export function setJSON<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        logger.warn("localStorage write failed", { key, error: (err as Error).message });
    }
}

export function setBool(key: string, value: boolean): void {
    try {
        localStorage.setItem(key, value ? "true" : "false");
    } catch (err) {
        logger.warn("localStorage write failed", { key, error: (err as Error).message });
    }
}

/* ---------------- REMOVE ---------------- */
export function removeJSON(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        logger.warn("localStorage write failed", { key, error: (err as Error).message });
    }
}