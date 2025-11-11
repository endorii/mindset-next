import { ButtonWithIcon, MonoButton } from "@/shared/ui/buttons";
import { InputField } from "@/shared/ui/inputs/InputField";
import { LoginComponentsWrapper } from "@/shared/ui/wrappers";
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
            setLoginMessage(err?.message || "Помилка входу");
        }
    };

    return (
        <LoginComponentsWrapper title="Вхід">
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleLoginSubmit(onLoginSubmit)}
            >
                <InputField
                    label="електронна пошта*"
                    id={"loginEmail"}
                    type="email"
                    {...loginRegister("email", {
                        required: "Введіть email",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Некоректна електронна адреса",
                        },
                    })}
                    errorMessage={loginErrors.email?.message}
                />

                <InputField
                    label="пароль*"
                    id={"loginPassword"}
                    type="password"
                    {...loginRegister("password", {
                        required: "Введіть пароль",
                        minLength: {
                            value: 8,
                            message:
                                "Пароль повинен містити щонайменше 8 символів",
                        },
                    })}
                    errorMessage={loginErrors.password?.message}
                />

                {loginMessage && (
                    <p className="text-red-500 text-sm">{loginMessage}</p>
                )}

                <MonoButton
                    type="submit"
                    disabled={loginUserMutation.isPending}
                >
                    {loginUserMutation.isPending ? "Завантаження..." : "Увійти"}
                </MonoButton>
            </form>
            <div className="font-semibold text-neutral-400 text-center">
                Або
            </div>
            <div className="w-full">
                <ButtonWithIcon onClick={handleGoogleLogin} className="w-full">
                    <img src="./google.svg" alt="" />
                    <div>Продовжити з Google</div>
                </ButtonWithIcon>
            </div>
        </LoginComponentsWrapper>
    );
}
