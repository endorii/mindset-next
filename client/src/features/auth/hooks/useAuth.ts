import { useUserStore } from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    loginUser,
    logoutUser,
    refreshToken,
    registerUser,
    resendVerifyUser,
    verifyUser,
} from "../api/auth.api";
import { CreateUserDto, ILoginCredentials } from "../types/auth.types";

export function useLoginUser() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { setUser } = useUserStore();

    return useMutation({
        mutationFn: (credentials: ILoginCredentials) => loginUser(credentials),
        onSuccess: (data) => {
            // 1️⃣ Зберігаємо user та accessToken в Zustand
            setUser(data.data?.user ?? null, data.data?.accessToken ?? null);

            // 2️⃣ Навігація та оновлення query
            router.push("/");
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });

            toast.success(data.message);
        },
        onError: (error: any) => {
            toast.error(error?.message || "Сталася невідома помилка");
        },
    });
}

export function useRegisterUser() {
    return useMutation({
        mutationFn: (data: CreateUserDto) => registerUser(data),
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error: any) => {
            toast.error(error?.message || "Сталася невідома помилка");
        },
    });
}

export function useVerifyUser() {
    const router = useRouter();

    return useMutation({
        mutationFn: (token: string) => verifyUser(token),
        onSuccess: (data) => {
            setTimeout(() => router.push("/auth"), 2500);
            toast.success(data.message);
            return data.message;
        },
        onError: (error: any) => {
            toast.error(error?.message || "Сталася невідома помилка");
        },
    });
}

export function useResendVerification() {
    return useMutation({
        mutationFn: (email: string) => resendVerifyUser(email),
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error: any) => {
            toast.error(error?.message || "Сталася невідома помилка");
        },
    });
}

export function useLogoutUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: (data) => {
            queryClient.removeQueries({ queryKey: ["currentUser"] });
            toast.success(data.message);
        },
        onError: (error: any) => {
            toast.error(error?.message || "Сталася невідома помилка");
        },
    });
}

export function useRefreshToken() {
    return useMutation({
        mutationFn: refreshToken,
    });
}
