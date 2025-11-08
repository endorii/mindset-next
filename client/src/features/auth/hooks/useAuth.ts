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
            setUser(data.data?.user ?? null, data.data?.accessToken ?? null);

            if (data.data?.user && data.data?.accessToken) {
                queryClient.setQueryData(["currentUser"], data.data?.user);
                queryClient.setQueryData(["accessToken"], data.data?.accessToken);
            }

            router.push("/");

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
    const { clearUser } = useUserStore();

    return useMutation({
        mutationFn: () => logoutUser(),
        onSuccess: (data) => {
            clearUser();

            queryClient.removeQueries({ queryKey: ["currentUser"] });
            queryClient.removeQueries({ queryKey: ["accessToken"] });
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
