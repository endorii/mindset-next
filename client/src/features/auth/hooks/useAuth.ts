import { useUserStore } from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    forgotPassword,
    loginUser,
    logoutUser,
    refreshToken,
    registerUser,
    resendVerifyUser,
    resetPassword,
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
            toast.error(error?.message || "An unknown error occurred.");
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
            toast.error(error?.message || "An unknown error occurred.");
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
            toast.error(error?.message || "An unknown error occurred.");
        },
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: (email: string) => forgotPassword(email),
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error: any) => {
            toast.error(error?.message || "An unknown error occurred.");
        },
    });
}

export function useResetPassword() {
    return useMutation({
        mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) =>
            resetPassword({ token, newPassword }),
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error: any) => {
            toast.error(error?.message || "An unknown error occurred.");
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
            toast.error(error?.message || "An unknown error occurred.");
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

            window.location.href = "/";

            toast.success(data.message);
        },
        onError: (error: any) => {
            toast.error(error?.message || "An unknown error occurred.");
        },
    });
}

export function useRefreshToken() {
    return useMutation({
        mutationFn: refreshToken,
    });
}
