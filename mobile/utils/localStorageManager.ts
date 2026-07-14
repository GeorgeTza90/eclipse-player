import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getJSON<T>(key: string, fallback: T): Promise<T> {
    try {
        const v = await AsyncStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
    } catch {
        return fallback;
    }
}

export async function setJSON(key: string, value: unknown) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch { }
}

export async function getBool(key: string, fallback = false): Promise<boolean> {
    try {
        const v = await AsyncStorage.getItem(key);
        if (v === "true") return true;
        if (v === "false") return false;
        return fallback;
    } catch {
        return fallback;
    }
}

export async function setBool(key: string, value: boolean) {
    try {
        await AsyncStorage.setItem(key, value ? "true" : "false");
    } catch { }
}

export async function removeItem(key: string) {
    try {
        await AsyncStorage.removeItem(key);
    } catch { }
}