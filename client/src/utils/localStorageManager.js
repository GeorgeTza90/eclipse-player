export function getBool(key, fallback = false) {
    const v = localStorage.getItem(key);
    if (v === "true") return true;
    if (v === "false") return false;
    return fallback;
}

export function getJSON(key, fallback = null) {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
    } catch {
        return fallback;
    }
}

export function setJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function setBool(key, value) {
    localStorage.setItem(key, value ? "true" : "false");
}
