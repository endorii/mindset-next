import { ButtonWithIcon, MonoButton } from "@/shared/ui/buttons";
import { InputField } from "@/shared/ui/inputs/InputField";
import { LoginComponentsWrapper } from "@/shared/ui/wrappers";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../hooks/useAuth";
import { ILoginCredentials } from "../types/auth.types";

export function LoginForm() {
    const [loginMessage, setLoginMessage] = useState<string | null>(null);
    const loginUserMutation = useLoginUser();
    const {
        register: loginRegister,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
    } = useForm<ILoginCredentials>();

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    };

    const onLoginSubmit = async (data: ILoginCredentials) => {
        try {
            await loginUserMutation.mutateAsync(data);
        } catch (err: any) {
            setLoginMessage(err?.message || "Login error");
        }
    };

    return (
        <LoginComponentsWrapper title="Log In">
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleLoginSubmit(onLoginSubmit)}
            >
                <InputField
                    label="e-mail*"
                    id={"loginEmail"}
                    type="email"
                    {...loginRegister("email", {
                        required: "Enter e-mail",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid e-mail address",
                        },
                    })}
                    errorMessage={loginErrors.email?.message}
                />

                <InputField
                    label="password*"
                    id={"loginPassword"}
                    type="password"
                    {...loginRegister("password", {
                        required: "Enter password",
                        minLength: {
                            value: 8,
                            message:
                                "Password must contain at least 8 characters",
                        },
                    })}
                    errorMessage={loginErrors.password?.message}
                />

                {loginMessage && (
                    <p className="text-red-500 text-sm">{loginMessage}</p>
                )}
                <Link
                    href="/auth/forgot-password"
                    className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
                >
                    Forgot password?
                </Link>

                <MonoButton
                    type="submit"
                    disabled={loginUserMutation.isPending}
                >
                    {loginUserMutation.isPending ? "Loading..." : "Log In"}
                </MonoButton>
            </form>
            <div className="flex items-center justify-between">
                <hr className="w-full border-t border-white/5" />
                <div className=" px-[10px] font-semibold text-neutral-400 text-center">
                    Or
                </div>
                <hr className="w-full border-t border-white/5" />
            </div>
            <div className="w-full">
                <ButtonWithIcon onClick={handleGoogleLogin} className="w-full">
                    <img src="./google.svg" alt="" />
                    <div>Continue with Google</div>
                </ButtonWithIcon>
            </div>
        </LoginComponentsWrapper>
    );
}
