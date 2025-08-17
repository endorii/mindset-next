import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    loginUser,
    registerUser,
    logoutUser,
    refreshToken,
    verifyUser,
    resendVerifyUser,
} from "../api/auth.api";
import { CreateUserDto, ILoginCredentials } from "../types/auth.types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLoginUser() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (credentials: ILoginCredentials) => loginUser(credentials),
        onSuccess: (data) => {
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
