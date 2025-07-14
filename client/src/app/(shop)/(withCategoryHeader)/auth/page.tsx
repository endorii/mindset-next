"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
    ILoginCredentials,
    CreateUserDto,
} from "@/features/auth/types/auth.types";
import InputField from "@/shared/ui/inputs/InputField";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import Security from "@/features/auth/components/Security";
import LoginForm from "@/features/auth/components/LoginForm";
import RegisterForm from "@/features/auth/components/RegisterFrom";

type RegisterFormInputs = CreateUserDto & {
    rules: boolean;
    offers: boolean;
};

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
    }, [currentUser, isUserLoading, isUserError, router]);

    return (
        <div className="flex flex-col md:flex-row justify-between gap-[30px] pt-[50px] p-[10px] text-white">
            <Security />
            <LoginForm />
            <RegisterForm />
        </div>
    );
};

export default Login;
