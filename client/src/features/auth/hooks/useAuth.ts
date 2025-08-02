import { useQueryClient, useMutation } from "@tanstack/react-query";
import { login, registerUser, logout, refreshToken } from "../api/auth.api";
import { IAuthResponse } from "../types/auth.types";
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
    });

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {},
    });

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.setQueryData(["currentUser"], null);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            router.push("/auth");
        },
    });

    const refreshTokenMutation = useMutation({
        mutationFn: refreshToken,
    });
    return {
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout: logoutMutation.mutateAsync,
        refreshToken: refreshTokenMutation.mutateAsync,
        isLoading:
            loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,

        error: loginMutation.error,
    };
}
