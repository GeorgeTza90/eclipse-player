export const API_URL = import.meta.env.VITE_API_URL;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const CURRENT_APK_VERSION = import.meta.env.VITE_CURRENT_APK_VERSION;

if (!API_URL) throw new Error("Missing VITE_API_URL environment variable");
if (!GOOGLE_CLIENT_ID) throw new Error("Missing VITE_GOOGLE_CLIENT_ID environment variable");
if (!CURRENT_APK_VERSION) throw new Error("Missing VITE_CURRENT_APK_VERSION environment variable");