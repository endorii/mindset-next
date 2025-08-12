import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserAddress, editUserAddress } from "../api/user-address.api";
import { IUserShippingAdress } from "../../user-info/types/user.types";
import { toast } from "sonner";

export function useCreateUserAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: IUserShippingAdress) => createUserAddress(data),
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

export function useEditUserAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<IUserShippingAdress>) => editUserAddress(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
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
