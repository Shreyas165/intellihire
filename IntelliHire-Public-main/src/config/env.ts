export const env = {
    neonDbUrl: import.meta.env.VITE_NEON_DB_URL,
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    googleClientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
} as const;

// Validate environment variables
const requiredEnvVars = ['neonDbUrl', 'googleClientId', 'googleClientSecret', 'apiBaseUrl'] as const;
for (const envVar of requiredEnvVars) {
    if (!env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}