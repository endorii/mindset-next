import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/features/auth/api/auth.api";
import { IUser } from "../types/user.types";
import { changePassword, deleteUser, editUser } from "../api/users.api";
import { toast } from "sonner";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: () => getCurrentUser(),
        retry: false,
    });
}

export function useEditUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<IUser>) => editUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });
            toast.success("Інформацію успішно відредаговано!");
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("Сталася невідома помилка");
            }
        },
    });
}

export function useChangePassword() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { oldPassword: string; newPassword: string }) => changePassword(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });
            toast.success("Пароль успішно змінено");
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("Сталася невідома помилка");
            }
        },
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (password: string) => deleteUser(password),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });
            toast.success("Акаунт успішно видалено!");
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("Сталася невідома помилка");
            }
        },
    });
}
