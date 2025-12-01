"use client";

import { useForgotPassword } from "@/features/auth/hooks/useAuth";
import { Title } from "@/shared/components";
import { MonoButton } from "@/shared/ui/buttons";
import { InputField } from "@/shared/ui/inputs";
import { useForm } from "react-hook-form";

interface FormData {
    email: string;
}

export default function ForgotPasswordPage() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
        },
    });

    const forgotPasswordMutation = useForgotPassword();

    const onSubmit = async (data: FormData) => {
        await forgotPasswordMutation.mutateAsync(data.email);
        reset();
    };

    return (
        <div className="flex justify-center items-center h-[90vh] pb-[200px] md:pb-[100px] text-white p-[10px]">
            <div className="flex flex-col gap-[20px] bg-white/5 p-[40px]">
                <Title title={"Reset password"} />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-[20px]"
                >
                    <InputField
                        label="E-mail*"
                        placeholder="youremail@mail.com"
                        register={{
                            ...register("email", {
                                required: "Enter e-mail",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid e-mail format",
                                },
                            }),
                        }}
                        errorMessage={errors.email?.message}
                    />
                    <MonoButton
                        type="submit"
                        disabled={forgotPasswordMutation.isPending}
                    >
                        {forgotPasswordMutation.isPending
                            ? "Sending..."
                            : "Reset password"}
                    </MonoButton>
                </form>
            </div>
        </div>
    );
}
