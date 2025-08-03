"use client";

import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { Security, LoginForm, RegisterForm } from "@/features/auth/components";
import { useRouter } from "next/navigation";
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
        <div
            className="flex flex-row justify-between gap-[20px] p-[30px] pt-[10px] md:p-[10px] text-white
                        md:flex-col"
        >
            <LoginForm />
            <RegisterForm />
            <Security />
        </div>
    );
};

export default Login;
