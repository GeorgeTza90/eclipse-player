/* ---------------- GET ---------------- */
export function getBool(key, fallback = false) {
    try {
        const v = localStorage.getItem(key);
        if (v === "true") return true;
        if (v === "false") return false;
        return fallback;
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
export function setJSON(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));    
    } catch {}    
}

export function setBool(key, value) {
    try {
        localStorage.setItem(key, value ? "true" : "false");
    } catch {}    
}

/* ---------------- REMOVE ---------------- */
export function removeJSON(key) {
    try {
        localStorage.removeItem(key);    
    } catch {}    
}
