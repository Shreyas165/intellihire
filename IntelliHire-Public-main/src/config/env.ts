export const env = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
} as const;

// Validate only client-safe required variables
const requiredEnvVars = ['apiBaseUrl'] as const;
for (const envVar of requiredEnvVars) {
    if (!env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}
