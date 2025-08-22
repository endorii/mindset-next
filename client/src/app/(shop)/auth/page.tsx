"use client";

import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import {
    Security,
    LoginForm,
    RegistrationForm,
} from "@/features/auth/components";
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
        <div
            className="flex flex-row justify-between gap-[15px] p-[30px] pt-[10px] md:p-[10px] text-white
                        md:flex-col"
        >
            <LoginForm />
            <RegistrationForm />
            <Security />
        </div>
    );
};

export default Login;
