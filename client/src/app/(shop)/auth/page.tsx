"use client";

import {
    LoginForm,
    RegistrationForm,
    Security,
} from "@/features/auth/components";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
    const router = useRouter();
    const { data: currentUser, isPending: isUserLoading } = useCurrentUser();

    useEffect(() => {
        if (!isUserLoading && currentUser) {
            router.push("/");
        }
    }, [currentUser, isUserLoading, router]);

    return (
        <div className="flex flex-row justify-between gap-4 p-8 md:flex-col md:p-4 text-white">
            <LoginForm />
            <RegistrationForm />
            <Security />
        </div>
    );
};

export default Login;
