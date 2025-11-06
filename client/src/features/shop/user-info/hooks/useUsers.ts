import { currentUser } from "@/features/auth/api/auth.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePassword, deleteUser, editUser } from "../api/users.api";
import { IUser } from "../types/user.types";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: () => currentUser(),
    });
}

export function useEditUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<IUser>) => editUser(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });
            toast.success(data.message);
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
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });
            toast.success(data.message);
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
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });
            toast.success(data.message);
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
