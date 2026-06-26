export const API_URL = import.meta.env.VITE_API_URL;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!API_URL) throw new Error("Missing VITE_API_URL environment variable");
if (!GOOGLE_CLIENT_ID) throw new Error("Missing VITE_GOOGLE_CLIENT_ID environment variable");