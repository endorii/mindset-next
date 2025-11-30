"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Title } from "@/features/admin/attributes/components/Title";
import { useResetPassword } from "@/features/auth/hooks/useAuth";
import { MonoButton } from "@/shared/ui/buttons";
import { InputField } from "@/shared/ui/inputs";
import { useEffect } from "react";

interface FormData {
    password: string;
    confirmPassword: string;
}

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/auth");
            return;
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<FormData>({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const resetPasswordMutation = useResetPassword();

    const onSubmit = async (data: FormData) => {
        if (!token) {
            router.push("/auth");
            return;
        }

        await resetPasswordMutation.mutateAsync({
            token,
            newPassword: data.password,
        });

        reset();

        await new Promise((resolve) => setTimeout(resolve, 2000));

        router.push("/auth");
    };

    return (
        <div className="flex justify-center items-center h-[90vh] pb-[200px] text-white">
            <div className="flex flex-col gap-[20px] bg-white/5 p-[40px]">
                <Title title="Create new password" />

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-[20px]"
                >
                    <InputField
                        type="password"
                        label="New password*"
                        placeholder=""
                        register={{
                            ...register("password", {
                                required: "Enter new password",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                            }),
                        }}
                        errorMessage={errors.password?.message}
                    />

                    <InputField
                        type="password"
                        label="Confirm password*"
                        placeholder=""
                        register={{
                            ...register("confirmPassword", {
                                required: "Confirm your password",
                                validate: (value) =>
                                    value === watch("password") ||
                                    "Passwords do not match",
                            }),
                        }}
                        errorMessage={errors.confirmPassword?.message}
                    />

                    <MonoButton
                        type="submit"
                        disabled={resetPasswordMutation.isPending}
                    >
                        {resetPasswordMutation.isPending
                            ? "Updating..."
                            : "Update password"}
                    </MonoButton>
                </form>
            </div>
        </div>
    );
}
