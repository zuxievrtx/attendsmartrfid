import axios from "axios";

// Create axios instance
export const api = axios.create({
    baseURL: process.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
    withCredentials: true
});

// Auth service
export const AuthService = {
    setToken: (token) => {
        if (token) {
            localStorage.setItem("token", `Bearer ${token}`);
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    },

    removeToken: () => {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
    },

    getToken: () => {
        return localStorage.getItem("token");
    },

    isAuthenticated: () => {
        const token = localStorage.getItem("token");
        return !!token;
    }
};

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        const token = AuthService.getToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            AuthService.removeToken();
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);