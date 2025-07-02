import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserAddress, editUserAddress } from "../api/user-address.api";
import { IUser, IUserShippingAdress } from "../../user-info/types/user.types";

export function useCreateUserAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: IUserShippingAdress) => createUserAddress(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user-address"],
            });

            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });
        },
    });
}

export function useEditUserAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userId,
            data,
        }: {
            userId: IUser["id"];
            data: Partial<IUserShippingAdress>;
        }) => editUserAddress(userId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-address"] });
            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });
        },
    });
}
