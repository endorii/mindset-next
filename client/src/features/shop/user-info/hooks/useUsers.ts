import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/features/auth/api/auth.api";
import { IUser } from "../types/user.types";
import { changePassword, deleteUser, editUser } from "../api/users.api";

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
        },
    });
}
