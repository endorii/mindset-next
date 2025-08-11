import { useQueryClient, useMutation } from "@tanstack/react-query";
import { login, registerUser, logout, refreshToken } from "../api/auth.api";
import { IAuthResponse } from "../types/auth.types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useAuth() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data: IAuthResponse) => {
            queryClient.setQueryData(["currentUser"], data);
            router.push("/");
            toast.success("Ви успішно увійшли до акаунту!");
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("Сталася невідома помилка");
            }
        },
    });

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success("Ви успішно зареєструвалися!");
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("Сталася невідома помилка");
            }
        },
    });

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.setQueryData(["currentUser"], null);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            router.push("/auth");
            toast.success("Ви успішно вийшли з акаунту!");
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("Сталася невідома помилка");
            }
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
        isPending:
            loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,

        error: loginMutation.error,
    };
}
