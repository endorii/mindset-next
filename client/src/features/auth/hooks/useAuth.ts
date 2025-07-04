import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, registerUser, logout, refreshToken } from "../api/auth.api";
import { IAuthResponse } from "../types/auth.types";

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
            router.push("/auth");
        },
        onError: (error) => {
            console.error("Logout error:", error);
            queryClient.setQueryData(["currentUser"], null);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            router.push("/auth");
        },
    });

    const refreshTokenMutation = useMutation({
        mutationFn: refreshToken,
        onError: (error) => {
            console.error("Refresh token error:", error);
            queryClient.setQueryData(["currentUser"], null);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            router.push("/auth");
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
