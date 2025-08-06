import { MonoButton } from "@/shared/ui/buttons";
import InputField from "@/shared/ui/inputs/InputField";
import { LoginComponentsWrapper } from "@/shared/ui/wrappers";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { CreateUserDto } from "../types/auth.types";

type RegisterFormInputs = CreateUserDto & {
    rules: boolean;
    offers: boolean;
};

function RegisterForm() {
    const { register: registerUser, isPending } = useAuth();

    const [registerMessage, setRegisterMessage] = useState<string | null>(null);
    const [registerIsSuccess, setRegisterIsSuccess] = useState(false);

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
            await registerUser(data);
            setRegisterMessage("Реєстрація успішна!");
            setRegisterIsSuccess(true);
            reset();
            toast.success("Реєстрація успішна!");
        } catch (err: any) {
            setRegisterMessage(err?.message || "Помилка реєстрації");
        }
    };

    return (
        <LoginComponentsWrapper title={"Реєстрація"}>
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleRegisterSubmit(onRegisterSubmit)}
            >
                <InputField
                    label="ім'я користувача*"
                    type="text"
                    {...registerForm("name", {
                        required: "Введіть ім'я користувача",
                        minLength: {
                            value: 3,
                            message: "Мінімальна довжина імені — 3 символи",
                        },
                        maxLength: {
                            value: 15,
                            message: "Максимальна довжина імені — 15 символів",
                        },
                        pattern: {
                            value: /^[A-Za-z0-9]+$/,
                            message:
                                "Нікнейм має містити лише англійські літери та цифри",
                        },
                    })}
                    errorMessage={registerErrors.name?.message}
                />

                <InputField
                    label="електронна пошта*"
                    id={"registerEmail"}
                    type="email"
                    {...registerForm("email", {
                        required: "Введіть email",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Некоректна електронна адреса",
                        },
                    })}
                    errorMessage={registerErrors.email?.message}
                />

                <InputField
                    label="телефон*"
                    type="tel"
                    {...registerForm("phone", {
                        required: "Введіть номер телефону",
                        pattern: {
                            value: /^\+?[\d\s\-]{10,15}$/,
                            message: "Некоректний формат телефону",
                        },
                    })}
                    errorMessage={registerErrors.phone?.message}
                />

                <InputField
                    label="пароль*"
                    id={"registerPassword"}
                    type="password"
                    {...registerForm("password", {
                        required: "Введіть пароль",
                        minLength: {
                            value: 8,
                            message:
                                "Пароль повинен містити щонайменше 8 символів",
                        },
                        maxLength: {
                            value: 32,
                            message:
                                "Пароль не повинен перевищувати 32 символи",
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "Пароль має містити літери та цифри",
                        },
                    })}
                    errorMessage={registerErrors.password?.message}
                />

                <div className="text-sm flex flex-col gap-[7px]">
                    <div className="flex gap-[10px] items-center">
                        <input
                            type="checkbox"
                            {...registerForm("rules", {
                                required:
                                    "Потірбно погодитися з правилами магазину",
                            })}
                            className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                            Я погоджуюсь з{" "}
                            <span className="underline text-blue-400 hover:text-blue-300">
                                правилами магазину
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
                            className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                            Згідний отримувати комерційні пропозиції від{" "}
                            <span className="underline text-blue-400 hover:text-blue-300">
                                mindset.ua
                            </span>{" "}
                            на вказаний email
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
                <MonoButton type="submit" disabled={isPending}>
                    {isPending ? "Завантаження..." : "Зареєструватися"}
                </MonoButton>
            </form>
        </LoginComponentsWrapper>
    );
}

export default RegisterForm;
