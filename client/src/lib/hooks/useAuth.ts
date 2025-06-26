import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, registerUser, refreshToken, logout } from "@/lib/api/auth.api";
import { IAuthResponse } from "@/types/auth/auth.types";
import { useRouter } from "next/navigation";

export function useAuth() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data: IAuthResponse) => {
            queryClient.setQueryData(["currentUser"], data);
            router.push("/");
        },
        onError: (error) => {
            console.error("Login error:", error);
        },
    });

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {},
        onError: (error) => {
            console.error("Register error:", error);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.setQueryData(["currentUser"], null);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            router.push("/login");
        },
        onError: (error) => {
            console.error("Logout error:", error);
            queryClient.setQueryData(["currentUser"], null);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            router.push("/login");
        },
    });

    const refreshTokenMutation = useMutation({
        mutationFn: refreshToken,
        onSuccess: (data: IAuthResponse) => {
            queryClient.setQueryData(["refreshToken"], data);
        },
        onError: (error) => {
            console.error("Refresh token error:", error);
            queryClient.setQueryData(["currentUser"], null);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            router.push("/login");
        },
    });

    return {
        login: loginMutation.mutate,
        register: registerMutation.mutate,
        logout: logoutMutation.mutate,
        refreshToken: refreshTokenMutation.mutate,
        isLoading:
            loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,

        error: loginMutation.error,
    };
}
