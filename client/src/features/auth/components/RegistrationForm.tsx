import { MonoButton } from "@/shared/ui/buttons";
import { InputField } from "@/shared/ui/inputs/InputField";
import { LoginComponentsWrapper } from "@/shared/ui/wrappers";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegisterUser } from "../hooks/useAuth";
import { CreateUserDto } from "../types/auth.types";

type RegisterFormInputs = CreateUserDto;

export function RegistrationForm() {
    const [registerMessage, setRegisterMessage] = useState<string | null>(null);
    const [registerIsSuccess, setRegisterIsSuccess] = useState(false);

    const registerUserMutation = useRegisterUser();

    const {
        register: registerForm,
        reset,
        handleSubmit: handleRegisterSubmit,
        formState: { errors: registerErrors },
    } = useForm<RegisterFormInputs>();

    const onRegisterSubmit = async (data: RegisterFormInputs) => {
        setRegisterMessage(null);
        setRegisterIsSuccess(false);

        try {
            await registerUserMutation.mutateAsync({
                ...data,
                isVerified: false,
            });
            setRegisterMessage(
                "Registration successful! A confirmation message has been sent to your email"
            );
            setRegisterIsSuccess(true);
            reset();
        } catch (err: any) {
            setRegisterMessage(
                "An error occurred during registration, please try again later."
            );
            setRegisterIsSuccess(false);
            setRegisterMessage(err?.message || "Registration error");
        }
    };

    return (
        <LoginComponentsWrapper title={"Registration"}>
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleRegisterSubmit(onRegisterSubmit)}
            >
                <InputField
                    label="User name*"
                    type="text"
                    {...registerForm("userName", {
                        required: "Enter user name",
                        minLength: {
                            value: 3,
                            message: "Minimum name length is 3 characters.",
                        },
                        maxLength: {
                            value: 15,
                            message: "Maximum name length is 15 characters.",
                        },
                        pattern: {
                            value: /^[A-Za-z0-9]+$/,
                            message:
                                "Nickname must contain only English letters and numbers",
                        },
                    })}
                    errorMessage={registerErrors.userName?.message}
                />

                <InputField
                    label="E-mail*"
                    id={"registerEmail"}
                    type="email"
                    {...registerForm("email", {
                        required: "Enter e-mail",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid e-mail address",
                        },
                    })}
                    errorMessage={registerErrors.email?.message}
                />

                <InputField
                    label="phone (optional)"
                    type="tel"
                    {...registerForm("phone", {
                        setValueAs: (value) => value?.trim() || undefined,
                        pattern: {
                            value: /^\+?[\d\s\-]{10,15}$/,
                            message: "Incorrect phone format",
                        },
                    })}
                    errorMessage={registerErrors.phone?.message}
                />

                <InputField
                    label="password*"
                    id={"registerPassword"}
                    type="password"
                    {...registerForm("password", {
                        required: "Enter password",
                        minLength: {
                            value: 8,
                            message:
                                "Password must contain at least 8 characters",
                        },
                        maxLength: {
                            value: 32,
                            message: "Password must not exceed 32 characters.",
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                "Password must contain letters and numbers",
                        },
                    })}
                    errorMessage={registerErrors.password?.message}
                />

                <div className="text-sm flex flex-col gap-[3px]">
                    <div className="flex gap-[10px] items-center">
                        <input
                            type="checkbox"
                            {...registerForm("rules", {
                                required: "You must agree to the store rules.",
                            })}
                            className=" text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                            I agree with{" "}
                            <span className="underline text-blue-400 hover:text-blue-300">
                                store rules
                            </span>
                        </div>
                    </div>
                    {registerErrors.rules?.message && (
                        <p className={"text-red-500 text-sm"}>
                            {registerErrors.rules?.message}
                        </p>
                    )}
                    <div className="flex gap-[10px] items-center">
                        <input
                            type="checkbox"
                            {...registerForm("offers")}
                            className=" text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                            Agree to receive commercial offers from{" "}
                            <span className="underline text-blue-400 hover:text-blue-300">
                                mindset.ua
                            </span>{" "}
                            to the specified e-mail
                        </div>
                    </div>
                </div>

                {registerMessage && (
                    <p
                        className={
                            registerIsSuccess
                                ? "text-green-500 text-sm"
                                : "text-red-500 text-sm"
                        }
                    >
                        {registerMessage}
                    </p>
                )}
                <MonoButton
                    type="submit"
                    disabled={registerUserMutation.isPending}
                >
                    {registerUserMutation.isPending ? "Loading..." : "Register"}
                </MonoButton>
            </form>
        </LoginComponentsWrapper>
    );
}
