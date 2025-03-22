const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
    auth: {
        register: `${API_BASE_URL}/api/auth/register`,
        login: `${API_BASE_URL}/api/auth/login`,
        google: `${API_BASE_URL}/api/auth/google`,
        interviewerLogin: `${API_BASE_URL}/api/auth/interviewer/login`
    }
} as const; 