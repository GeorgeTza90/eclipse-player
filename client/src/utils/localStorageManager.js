import { encode, decode } from "./encoder";

/* ---------------- GET ---------------- */
export function getBool(key, fallback = false) {
    const v = localStorage.getItem(key);
    if (v === "true") return true;
    if (v === "false") return false;
    return fallback;
}

export function getUserJSON(key, fallback = null) {
    try {
        const v = localStorage.getItem(key);
        if (!v) return fallback;

        const parsed = JSON.parse(v);
        
        return {
            email: decode(parsed.email),
            id: decode(parsed.id),
            premium: decode(parsed.premium),
            username: decode(parsed.username),
        };
    } catch {
        return fallback;
    }
}

export function getJSON(key, fallback = null) {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
    } catch {
        return fallback;
    }
}

/* ---------------- SET ---------------- */
export function setUserJSON(key, value) {
    localStorage.setItem(
        key,
        JSON.stringify({
            email: encode(String(value.email)),
            id: encode(String(value.id)),
            premium: encode(String(value.premium)),
            username: encode(String(value.username)),
        })
    );   
}

export function setJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    
}

export function setBool(key, value) {
    localStorage.setItem(key, value ? "true" : "false");
}

/* ---------------- REMOVE ---------------- */
export function removeJSON(key) {
    localStorage.removeItem(key);
}
