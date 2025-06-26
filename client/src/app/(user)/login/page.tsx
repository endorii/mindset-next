"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BasicInput from "@/components/ui/inputs/BasicInput";
import { useAuth } from "@/lib/hooks/useAuth";
import { ILoginCredentials, CreateUserDto } from "@/types/auth/auth.types";
import { useCurrentUser } from "@/lib/hooks/useUsers";

const Login = () => {
    const router = useRouter();
    const { login, register, isLoading, error } = useAuth();
    const {
        data: currentUser,
        isLoading: isUserLoading,
        isError: isUserError,
    } = useCurrentUser();

    const [loginEmail, setLoginEmail] = useState<string>("");
    const [loginPassword, setLoginPassword] = useState<string>("");
    const [localLoginMessage, setLocalLoginMessage] = useState<string | null>(
        null
    );

    const [registerUsername, setRegisterUsername] = useState<string>("");
    const [registerEmail, setRegisterEmail] = useState<string>("");
    const [registerPassword, setRegisterPassword] = useState<string>("");
    const [registerPhone, setRegisterPhone] = useState<string>("");
    const [registerRulesCheckBox, setRegisterRulesCheckBox] =
        useState<boolean>(false);
    const [registerComerceCheckBox, setRegisterComerceCheckBox] =
        useState<boolean>(false);
    const [registerMessage, setRegisterMessage] = useState<string | null>(null);
    const [registerIsSuccess, setRegisterIsSuccess] = useState<boolean>(false);

    const loginData: ILoginCredentials = {
        email: loginEmail,
        password: loginPassword,
    };

    const registerData: CreateUserDto = {
        name: registerUsername,
        email: registerEmail,
        phone: registerPhone,
        password: registerPassword,
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalLoginMessage(null);

        try {
            login(loginData);
            setLocalLoginMessage("Успішний вхід!");
            router.push("/");
        } catch (err) {
            setLocalLoginMessage(error?.message || "Помилка входу");
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegisterMessage(null);
        setRegisterIsSuccess(false);

        if (registerPassword.length < 8) {
            setRegisterMessage("Пароль повинен містити щонайменше 8 символів.");
            return;
        }
        if (!registerRulesCheckBox) {
            setRegisterMessage("Ви повинні погодитися з правилами магазину.");
            return;
        }

        try {
            register(registerData);
            setRegisterMessage("Реєстрація успішна!");
            setRegisterIsSuccess(true);
        } catch (err) {
            setRegisterMessage(error?.message || "Помилка реєстрації");
        }
    };

    useEffect(() => {
        if (isUserLoading) {
            return;
        }

        if (currentUser) {
            router.push("/");
        }
    }, [currentUser, isUserLoading, isUserError, router]);

    return (
        <div className="flex flex-col md:flex-row justify-between gap-[50px] p-5">
            <div className="flex flex-col gap-[15px] w-full md:w-1/3">
                <h3 className="mt-[30px] text-xl font-bold">
                    Захист вашої інформації
                </h3>
                <ul className="text-gray-500 flex flex-col gap-[7px] text-sm p-[30px]">
                    <li>– Ваші дані зберігаються безпечно;</li>
                    <li>– ми використовуємо захищене з'єднання;</li>
                    <li>– інформація не передається третім особам;</li>
                    <li>– конфіденційність — наш пріоритет.</li>
                </ul>
            </div>

            {/* Форма входу */}
            <div className="flex flex-col gap-[15px] w-full md:w-1/3">
                <h3 className="mt-[30px] text-xl font-bold">Вхід</h3>
                <form
                    className="border border-gray-200 p-[30px] flex flex-col gap-[20px] rounded-md shadow-sm"
                    onSubmit={handleLoginSubmit}
                >
                    <BasicInput
                        label="електронна пошта*"
                        value={loginEmail}
                        onChangeValue={(e) => {
                            setLoginEmail(e.target.value);
                            setLocalLoginMessage(null);
                        }}
                        type="email"
                    />
                    <BasicInput
                        label="пароль*"
                        value={loginPassword}
                        onChangeValue={(e) => {
                            setLoginPassword(e.target.value);
                            setLocalLoginMessage(null);
                        }}
                        type="password"
                    />

                    {localLoginMessage && (
                        <p className="text-red-500 text-sm">
                            {localLoginMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full border border-transparent rounded-md
              hover:text-black hover:border-black hover:bg-white
              bg-black text-white px-[20px] py-[15px] mt-[30px]
              transition-all duration-300
              cursor-pointer
              disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed"
                        disabled={!loginEmail || !loginPassword || isLoading}
                    >
                        {isLoading ? "Завантаження..." : "Увійти"}
                    </button>
                </form>
            </div>

            <div className="flex flex-col gap-[15px] w-full md:w-1/3">
                <h3 className="mt-[30px] text-xl font-bold">Реєстрація</h3>
                <form
                    className="border border-gray-200 p-[30px] flex flex-col gap-[20px] rounded-md shadow-sm"
                    onSubmit={handleRegisterSubmit}
                >
                    <BasicInput
                        label="ім'я користувача*"
                        value={registerUsername}
                        onChangeValue={(e) => {
                            setRegisterUsername(e.target.value);
                            setRegisterMessage(null);
                        }}
                        placeholder="введіть ім'я користувача"
                        type="text"
                    />
                    <BasicInput
                        label="електронна пошта*"
                        value={registerEmail}
                        onChangeValue={(e) => {
                            setRegisterEmail(e.target.value);
                            setRegisterMessage(null);
                        }}
                        placeholder="введіть електронну пошту..."
                        type="email"
                    />
                    <BasicInput
                        label="телефон"
                        value={registerPhone}
                        onChangeValue={(e) => {
                            setRegisterPhone(e.target.value);
                            setRegisterMessage(null);
                        }}
                        placeholder="введіть номер телефону (не обов'язково)"
                        type="tel"
                    />
                    <BasicInput
                        label="пароль*"
                        value={registerPassword}
                        onChangeValue={(e) => {
                            setRegisterPassword(e.target.value);
                            setRegisterMessage(null);
                        }}
                        type="password"
                    >
                        <div className="text-xs text-gray-500 absolute bottom-[-15px] left-0">
                            мінімально 8 символів
                        </div>
                    </BasicInput>

                    <div className="text-sm flex flex-col gap-[7px] mt-[30px]">
                        <div className="flex gap-[10px] items-center">
                            <input
                                type="checkbox"
                                checked={registerRulesCheckBox}
                                onChange={() =>
                                    setRegisterRulesCheckBox(
                                        !registerRulesCheckBox
                                    )
                                }
                                className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <div className="text-gray-600">
                                Я погоджуюсь з правилами магазину
                            </div>
                        </div>
                        <div className="flex gap-[10px] items-center">
                            <input
                                type="checkbox"
                                checked={registerComerceCheckBox}
                                onChange={() =>
                                    setRegisterComerceCheckBox(
                                        !registerComerceCheckBox
                                    )
                                }
                                className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <div className="text-gray-600">
                                Згідний отримувати комерційні пропозиції від
                                mindset.ua на вказаний email
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

                    <button
                        className="w-full border border-transparent rounded-md
              hover:text-black hover:border-black hover:bg-white
              bg-black text-white px-[20px] py-[15px] mt-[30px]
              transition-all duration-300 cursor-pointer
              disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={
                            !registerUsername ||
                            !registerEmail ||
                            !registerPassword ||
                            !registerRulesCheckBox ||
                            isLoading
                        }
                    >
                        {isLoading ? "Завантаження..." : "Зареєструватися"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
