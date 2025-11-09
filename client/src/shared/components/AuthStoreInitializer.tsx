"use client";

import { IUser } from "@/features/shop/user-info/types/user.types";
import { useUserStore } from "@/store/userStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type User = IUser;

interface AuthStoreInitializerProps {
    user: User | null;
    accessToken: string | null;
}

export function AuthStoreInitializer({
    user,
    accessToken,
}: AuthStoreInitializerProps) {
    const queryClient = useQueryClient();
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        setUser(user, accessToken);

        if (user && accessToken) {
            queryClient.setQueryData(["currentUser"], user);
            queryClient.setQueryData(["accessToken"], accessToken);
        } else {
            queryClient.removeQueries({ queryKey: ["currentUser"] });
            queryClient.removeQueries({ queryKey: ["accessToken"] });
        }
    }, [user, accessToken, setUser, queryClient]);

    return null;
}
