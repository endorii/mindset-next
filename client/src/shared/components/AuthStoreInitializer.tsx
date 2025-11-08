"use client";

import { IUser } from "@/features/shop/user-info/types/user.types";
import { useUserStore } from "@/store/userStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type User = IUser;

interface AuthStoreInitializerProps {
    user: User | null;
    accessToken: string;
}

export function AuthStoreInitializer({
    user,
    accessToken,
}: AuthStoreInitializerProps) {
    const initialized = useRef(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!initialized.current) {
            useUserStore.getState().setUser(user, accessToken);
            if (user && accessToken) {
                queryClient.setQueryData(["currentUser"], user);
                queryClient.setQueryData(["accessToken"], accessToken);
            } else {
                queryClient.removeQueries({ queryKey: ["currentUser"] });
                queryClient.removeQueries({ queryKey: ["accessToken"] });
            }
            initialized.current = true;
        }
    }, [user, accessToken]);

    return null;
}
