import { IUser } from "@/types/user/user.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editUser, fetchUser } from "../api/users.api";

export function useUser(email: IUser["email"]) {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => fetchUser(email),
    });
}

export function useEditUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: IUser["id"]; data: Partial<IUser> }) => editUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },
    });
}
