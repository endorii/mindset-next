import { refreshToken } from "@/features/auth/api/auth.api";
import { useUserStore } from "@/store/userStore";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const httpService = axios.create({
    baseURL: API_BASE_URL,
});

export const httpServiceAuth = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// Зберігаємо Promise для refresh, щоб уникнути множинних викликів
let isRefreshing = false;
let refreshPromise: Promise<{ accessToken: string }> | null = null;

// Interceptor (CSR, in-memory)
httpServiceAuth.interceptors.request.use((config) => {
    const accessToken = useUserStore.getState().accessToken; // з Zustand, in-memory
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

httpServiceAuth.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Перевірка: чи є токен взагалі
            const currentToken = useUserStore.getState().accessToken;
            if (!currentToken) {
                // Немає токена - не намагаємося refresh
                return Promise.reject(error);
            }

            if (isRefreshing && refreshPromise) {
                try {
                    const { accessToken } = await refreshPromise;
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return httpServiceAuth.request(originalRequest);
                } catch {
                    return Promise.reject(error);
                }
            }

            isRefreshing = true;
            refreshPromise = refreshToken();

            try {
                const { accessToken: newAccessToken } = await refreshPromise;
                useUserStore.getState().setUser(useUserStore.getState().user!, newAccessToken);

                isRefreshing = false;
                refreshPromise = null;

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return httpServiceAuth.request(originalRequest);
            } catch (err) {
                isRefreshing = false;
                refreshPromise = null;
                useUserStore.getState().clearUser();

                // Опціонально: редірект на логін
                // window.location.href = '/login';

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);
