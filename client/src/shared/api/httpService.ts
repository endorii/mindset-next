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
let refreshPromise: Promise<{ data: string; message: string }> | null = null;

// ПРАВИЛЬНИЙ INTERCEPTOR ЗАПИТУ
httpServiceAuth.interceptors.request.use((config) => {
    const { accessToken } = useUserStore.getState();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// ПРАВИЛЬНИЙ INTERCEPTOR ВІДПОВІДІ
httpServiceAuth.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const { accessToken, setUser, clearUser, user } = useUserStore.getState();

            if (!accessToken) {
                return Promise.reject(error);
            }

            if (isRefreshing && refreshPromise) {
                try {
                    const { data } = await refreshPromise;
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                    return httpServiceAuth.request(originalRequest);
                } catch {
                    return Promise.reject(error);
                }
            }

            isRefreshing = true;
            refreshPromise = refreshToken();

            try {
                const { data: newAccessToken } = await refreshPromise;

                setUser(user, newAccessToken);

                isRefreshing = false;
                refreshPromise = null;

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return httpServiceAuth.request(originalRequest);
            } catch (err) {
                isRefreshing = false;
                refreshPromise = null;
                clearUser();
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);
