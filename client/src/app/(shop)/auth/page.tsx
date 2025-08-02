"use client";

import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { Security, LoginForm, RegisterForm } from "@/features/auth/components";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
    const router = useRouter();
    const {
        data: currentUser,
        isLoading: isUserLoading,
        isError: isUserError,
    } = useCurrentUser();

    useEffect(() => {
        if (!isUserLoading && currentUser) {
            router.push("/");
        }
    }, [currentUser, isUserLoading, router]);

    if (isUserLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row justify-between gap-[30px] pt-[50px] p-[10px] text-white">
            <Security />
            <LoginForm />
            <RegisterForm />
        </div>
    );
};

export default Login;
