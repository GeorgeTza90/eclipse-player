import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = Constants.expoConfig?.extra?.API_URL;

// -------------------- TOKEN CACHE --------------------
let cachedToken: string | null = null;

async function getToken() {
  if (cachedToken) return cachedToken;

  cachedToken = await AsyncStorage.getItem("token");
  return cachedToken;
}

// -------------------- ERROR CLASS --------------------
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

// -------------------- CORE FETCH --------------------
export async function apiFetch<T>(endpoint: string,  options: RequestInit = {}): Promise<T> {
  const token = await getToken();

  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const contentType = res.headers.get("content-type");

  let data: any = null;

  // -------------------- SAFE PARSING --------------------
  if (contentType?.includes("application/json")) {
        try {
            data = await res.json();
        } catch {
            data = null;
        }
  } else {
        try {
            data = await res.text();
        } catch {
            data = null;
        }
  }

  // -------------------- ERROR HANDLING --------------------
  if (!res.ok) {
    const message =
      data?.message ||
      data?.error ||
      (typeof data === "string" ? data : null) ||
      `HTTP ${res.status}`;

    throw new ApiError(res.status, message, data);
  }

  return data as T;
}

// -------------------- TOKEN MANAGEMENT HELPERS --------------------
export function clearTokenCache() {
  cachedToken = null;
}

export async function setToken(token: string) {
    cachedToken = token;
    await AsyncStorage.setItem("token", token);
}