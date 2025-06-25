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
            // Set cookies
            document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${60 * 60 * 24}`;
            document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${
                60 * 60 * 24 * 7
            }`;
            queryClient.setQueryData(["user"], data);
            router.push("/");
        },
    });

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data: IAuthResponse) => {
            document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${60 * 60 * 24}`;
            document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${
                60 * 60 * 24 * 7
            }`;
            queryClient.setQueryData(["user"], data);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            document.cookie = "accessToken=; path=/; max-age=0";
            document.cookie = "refreshToken=; path=/; max-age=0";
            queryClient.removeQueries({ queryKey: ["user"] });
            router.push("/login");
        },
    });

    const refreshTokenMutation = useMutation({
        mutationFn: refreshToken,
        onSuccess: (data: IAuthResponse) => {
            document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${60 * 60 * 24}`;
            document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${
                60 * 60 * 24 * 7
            }`;
            queryClient.setQueryData(["user"], data);
        },
    });

    return {
        login: loginMutation.mutate,
        register: registerMutation.mutate,
        logout: logoutMutation.mutate,
        refreshToken: refreshTokenMutation.mutate,
        isLoading:
            loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
        error: loginMutation.error || registerMutation.error || logoutMutation.error,
    };
}
