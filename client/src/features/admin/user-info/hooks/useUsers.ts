import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/features/auth/api/auth.api";
import { IUser } from "../types/user.types";
import { editUser } from "../api/users.api";

export function useCurrentUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false,
    });
}

export function useEditUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: IUser["id"]; data: Partial<IUser> }) => editUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });
        },
    });
}
