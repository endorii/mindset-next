"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getCurrentUser,
    login as apiLogin,
    logout as apiLogout,
} from "@/lib/api/auth.api";
import { ILoginData, IAuthResponse, IUserData } from "@/types/auth/auth.types";

interface AuthContextType {
    user: IUserData | null | undefined;
    isLoading: boolean;
    isLoggedIn: boolean;
    login: (data: ILoginData) => Promise<void>;
    logout: () => Promise<void>;
    loginError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
    const [loginError, setLoginError] = useState<string | null>(null);

    const {
        data: user,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useQuery<IUserData | null, Error>({
        queryKey: ["me"],
        queryFn: getCurrentUser,
        staleTime: 1000 * 60 * 5,
    });

    const loginMutation = useMutation<IAuthResponse, Error, ILoginData>({
        mutationFn: apiLogin,
        onSuccess: (data) => {
            setLoginError(null);
            queryClient.setQueryData(["me"], data.user as IUserData);
            console.log("Login successful, user:", data.user);
        },
        onError: (err) => {
            console.error("Login failed:", err);
            setLoginError(err.message || "Помилка входу. Спробуйте ще раз.");
        },
    });

    const logoutMutation = useMutation<void, Error, void>({
        mutationFn: apiLogout,
        onSuccess: () => {
            queryClient.setQueryData(["me"], null);
            console.log("Logout successful");
        },
        onError: (err) => {
            console.error("Logout failed:", err);
            queryClient.setQueryData(["me"], null);
        },
    });

    const handleLogin = async (data: ILoginData) => {
        setLoginError(null);
        await loginMutation.mutateAsync(data);
    };

    const handleLogout = async () => {
        await logoutMutation.mutateAsync();
    };

    const isLoggedIn = !!user;

    const contextValue: AuthContextType = {
        user,
        isLoading: isLoading,
        isLoggedIn,
        login: handleLogin,
        logout: handleLogout,
        loginError:
            loginError ||
            loginMutation.error?.message ||
            logoutMutation.error?.message ||
            error?.message ||
            null,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
