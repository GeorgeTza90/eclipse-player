// mobile/config.ts
const dev = __DEV__; // React Native παρέχει __DEV__ για development builds

export const API_URL = dev
  ? "http://192.168.0.101:3000" // local dev server
  : "https://your-app-name.up.railway.app"; // production (Railway)
