"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BasicInput from "@/components/ui/inputs/BasicInput";
import { register } from "@/lib/api/auth.api";
import { ILoginData, IRegisterData } from "@/types/auth/auth.types";

const Login = () => {
    const router = useRouter();

    const [loginEmail, setLoginEmail] = useState<string>("");
    const [loginPassword, setLoginPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<string | null>(null);

    const [registerUsername, setRegisterUsername] = useState<string>("");
    const [registerEmail, setRegisterEmail] = useState<string>("");
    const [registerPassword, setRegisterPassword] = useState<string>("");
    const [registerPhone, setRegisterPhone] = useState<string>("");
    const [registerRulesCheckBox, setRegisterRulesCheckBox] =
        useState<boolean>(false);
    const [registerComerceCheckBox, setRegisterComerceCheckBox] =
        useState<boolean>(false);
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

    const loginData: ILoginData = {
        email: loginEmail,
        password: loginPassword,
    };

    const registerData: IRegisterData = {
        username: registerUsername,
        email: registerEmail,
        phone: registerPhone,
        password: registerPassword,
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(null);
        try {
            // await login(loginData);
            // alert("Успішний вхід!");
            router.push("/");
        } catch (error: any) {
            console.error("Login error:", error);
            setLoginError(error.message || "Помилка входу. Спробуйте ще раз.");
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegisterError(null);
        setRegisterSuccess(false);

        if (registerPassword.length < 8) {
            setRegisterError("Пароль повинен містити щонайменше 8 символів.");
            return;
        }

        if (!registerRulesCheckBox) {
            setRegisterError("Ви повинні погодитися з правилами магазину.");
            return;
        }

        try {
            await register(registerData);
            setRegisterSuccess(true);
            alert("Реєстрація успішна! Тепер ви можете увійти.");
            setRegisterUsername("");
            setRegisterEmail("");
            setRegisterPassword("");
            setRegisterPhone("");
            setRegisterRulesCheckBox(false);
            setRegisterComerceCheckBox(false);
        } catch (error: any) {
            console.error("Register error:", error);
            setRegisterError(
                error.response?.data?.message ||
                    "Помилка реєстрації. Спробуйте ще раз."
            );
        }
    };

    return (
        <div className="flex justify-between gap-[50px]">
            <div className="flex flex-col gap-[15px] w-full">
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

            <div className="flex flex-col gap-[15px] w-full">
                <h3 className="mt-[30px] text-xl font-bold">Вхід</h3>
                <form
                    className="border border-gray-200 p-[30px] flex flex-col gap-[20px]"
                    onSubmit={handleLoginSubmit}
                >
                    <BasicInput
                        label={"електронна пошта*"}
                        value={loginEmail}
                        onChangeValue={(e) => {
                            setLoginEmail(e.target.value);
                        }}
                        type={"email"}
                    />
                    <BasicInput
                        label={"пароль*"}
                        value={loginPassword}
                        onChangeValue={(e) => {
                            setLoginPassword(e.target.value);
                        }}
                        type={"password"}
                    />
                    {loginError && (
                        <p className="text-red-500 text-sm">{loginError}</p>
                    )}{" "}
                    <button
                        type="submit"
                        className="w-full border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white px-[20px] py-[15px] mt-[30px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed"
                        disabled={!loginEmail || !loginPassword}
                    >
                        Увійти
                    </button>
                </form>
            </div>

            <div className="flex flex-col gap-[15px] w-full">
                <h3 className="mt-[30px] text-xl font-bold">Реєстрація</h3>
                <form
                    className="border border-gray-200 p-[30px] flex flex-col gap-[20px]"
                    onSubmit={handleRegisterSubmit}
                >
                    <BasicInput
                        label={"ім'я користувача*"}
                        value={registerUsername}
                        onChangeValue={(e) => {
                            setRegisterUsername(e.target.value);
                        }}
                        placeholder={"введіть ім'я користувача"}
                        type={"text"}
                    />
                    <BasicInput
                        label={"електонна пошта*"}
                        value={registerEmail}
                        onChangeValue={(e) => {
                            setRegisterEmail(e.target.value);
                        }}
                        placeholder="введіть електронну пошту..."
                        type={"email"}
                    />
                    <BasicInput
                        label={"телефон"}
                        value={registerPhone}
                        onChangeValue={(e) => {
                            setRegisterPhone(e.target.value);
                        }}
                        placeholder="введіть номер телефону (не обов'язково)"
                        type={"tel"}
                    />
                    <BasicInput
                        label={"пароль*"}
                        value={registerPassword}
                        onChangeValue={(e) => {
                            setRegisterPassword(e.target.value);
                        }}
                        type={"password"}
                    >
                        <div className="text-xs text-gray-500 absolute bottom-[-15px]">
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
                                className=""
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
                                className=""
                            />
                            <div className="text-gray-600">
                                Згідний отримувати комерційні пропозиції від
                                mindset.ua на вказаний email
                            </div>
                        </div>
                    </div>
                    {registerError && (
                        <p className="text-red-500 text-sm">{registerError}</p>
                    )}{" "}
                    {registerSuccess && (
                        <p className="text-green-500 text-sm">
                            Реєстрація успішна! Тепер ви можете увійти.
                        </p>
                    )}{" "}
                    <button
                        className="w-full border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white px-[20px] py-[15px] mt-[30px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={
                            !registerUsername ||
                            !registerEmail ||
                            !registerPhone ||
                            !registerPassword ||
                            !registerRulesCheckBox
                        }
                    >
                        Зареєструватися
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
