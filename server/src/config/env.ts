function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) throw new Error(`Missing ${name} env variable`);
    return value;
}

export const JWT_SECRET = requireEnv("JWT_SECRET");
export const FRONTEND_URL = requireEnv("FRONTEND_URL");
export const DUMMY_HASH = requireEnv("DUMMY_HASH");
export const NODE_ENV = requireEnv("NODE_ENV");
export const RESEND_API_KEY = requireEnv("RESEND_API_KEY");
export const CLIENT_ORIGINS = requireEnv("CLIENT_ORIGINS");

export const MYSQL_HOST = requireEnv("MYSQL_HOST");
export const MYSQL_USER = requireEnv("MYSQL_USER");
export const MYSQL_PASSWORD = requireEnv("MYSQL_PASSWORD");
export const MYSQL_DATABASE = requireEnv("MYSQL_DATABASE");
export const MYSQL_PORT = requireEnv("MYSQL_PORT");