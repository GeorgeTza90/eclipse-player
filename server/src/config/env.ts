function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name} env variable`);
  return value;
}

export const JWT_SECRET = requireEnv("JWT_SECRET");
export const FRONTEND_URL = requireEnv("FRONTEND_URL");
export const DUMMY_HASH = requireEnv("DUMMY_HASH");