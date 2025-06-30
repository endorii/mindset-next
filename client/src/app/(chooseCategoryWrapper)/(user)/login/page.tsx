"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { ILoginCredentials, CreateUserDto } from "@/types/auth/auth.types";
import { useCurrentUser } from "@/lib/hooks/useUsers";
import InputField from "@/components/AdminPage/components/InputField";

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
        <div className="flex flex-col md:flex-row justify-between gap-[30px] pt-[60px] p-[10px] text-white">
            <div className="flex flex-col gap-[15px] justify-between w-full md:w-1/3 rounded-xl bg-white/5 shadow-lg backdrop-blur-3xl border border-white/5 p-[20px] transition hover:shadow-xl hover:border-white/10">
                <div className="flex flex-col gap-[15px]">
                    <h3 className="text-4xl font-thin text-white">
                        Захист вашої інформації
                    </h3>
                    <hr className="border-t border-white/10" />

                    <p className="text-white/80 text-sm">
                        Ми серйозно ставимось до безпеки ваших персональних
                        даних і не передаємо їх третім особам. Ваше право на
                        конфіденційність для нас — понад усе.
                    </p>

                    <p className="text-white/60 text-sm">
                        Наша система використовує сучасні методи захисту
                        інформації, включно з багаторівневою аутентифікацією,
                        шифруванням та регулярним аудитом безпеки.
                    </p>

                    <ul className="flex flex-col gap-[7px] text-sm list-disc list-inside text-white/50">
                        <li>Ваші дані зберігаються безпечно</li>
                        <li>Ми використовуємо захищене з'єднання (SSL)</li>
                        <li>Інформація не передається третім особам</li>
                        <li>Конфіденційність — наш пріоритет</li>
                        <li>Регулярне оновлення політики безпеки</li>
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-green-300">
                        <span className="bg-green-800/30 px-2 py-1 rounded-md">
                            SSL Secure
                        </span>
                        <span className="bg-green-800/30 px-2 py-1 rounded-md">
                            GDPR Ready
                        </span>
                        <span className="bg-green-800/30 px-2 py-1 rounded-md">
                            ISO/IEC 27001
                        </span>
                    </div>

                    <p className="text-xs text-white/40 mt-1">
                        🔒 Понад 100 користувачів вже довірили нам свої дані.
                    </p>
                </div>

                <div className="flex flex-col gap-[15px]">
                    <p className="text-sm text-white/60">
                        Якщо у вас виникли питання щодо того, як ми зберігаємо
                        чи обробляємо ваші дані — зв’яжіться з нашою службою
                        підтримки, і ми з радістю відповімо.
                    </p>

                    <div className="flex flex-col gap-[5px]">
                        <a
                            href="/privacy-policy"
                            className="text-xs underline text-blue-400 hover:text-blue-300 w-fit"
                        >
                            Детальніше про політику конфіденційності
                        </a>
                        <p className="text-xs text-white/30">
                            Останнє оновлення: червень 2025
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-[15px] w-full md:w-1/3 rounded-xl bg-white/5 shadow-lg backdrop-blur-3xl border border-white/5 p-[20px]">
                <h3 className="text-4xl font-thin">Вхід</h3>
                <hr className="border-t border-white/10" />
                <form
                    className="flex flex-col gap-[20px] rounded-md shadow-sm"
                    onSubmit={handleLoginSubmit}
                >
                    <InputField
                        label="електронна пошта*"
                        value={loginEmail}
                        onChangeValue={(e) => {
                            setLoginEmail(e.target.value);
                            setLocalLoginMessage(null);
                        }}
                        type="email"
                        id={"loginEmail"}
                        name={"loginEmail"}
                    />
                    <InputField
                        label="пароль*"
                        value={loginPassword}
                        onChangeValue={(e) => {
                            setLoginPassword(e.target.value);
                            setLocalLoginMessage(null);
                        }}
                        type="password"
                        id={"loginPassword"}
                        name={"loginPassword"}
                        placeholder={""}
                    />

                    {localLoginMessage && (
                        <p className="text-red-500 text-sm">
                            {localLoginMessage}
                        </p>
                    )}

                    <div className="underline cursor-pointer">
                        Забули пароль?
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-transparent px-[15px] py-[15px] rounded-xl font-bold border border-white/15 hover:border-white/60 hover:bg-black/40 cursor-pointer disabled:cursor-not-allowed transition-all duration-200 disabled:text-gray-500 disabled:border-white/10 disabled:bg-white/0"
                        disabled={!loginEmail || !loginPassword || isLoading}
                    >
                        {isLoading ? "Завантаження..." : "Увійти"}
                    </button>
                </form>
            </div>

            <div className="flex flex-col gap-[15px] w-full md:w-1/3 rounded-xl bg-white/5 shadow-lg backdrop-blur-3xl p-[20px]">
                <h3 className="text-4xl font-thin">Реєстрація</h3>
                <hr className="border-t border-white/10" />
                <form
                    className=" flex flex-col gap-[20px] rounded-md shadow-sm"
                    onSubmit={handleRegisterSubmit}
                >
                    <InputField
                        label="ім'я користувача*"
                        value={registerUsername}
                        onChangeValue={(e) => {
                            setRegisterUsername(e.target.value);
                            setRegisterMessage(null);
                        }}
                        type="text"
                        id={"registerName"}
                        name={"registerName"}
                    />
                    <InputField
                        label="електронна пошта*"
                        value={registerEmail}
                        onChangeValue={(e) => {
                            setRegisterEmail(e.target.value);
                            setRegisterMessage(null);
                        }}
                        type="email"
                        id={"registerEmail"}
                        name={"registerEmail"}
                    />
                    <InputField
                        label="телефон"
                        value={registerPhone}
                        onChangeValue={(e) => {
                            setRegisterPhone(e.target.value);
                            setRegisterMessage(null);
                        }}
                        type="tel"
                        id={"registerPhone"}
                        name={"registerPhone"}
                    />

                    <InputField
                        label="пароль*"
                        value={registerPassword}
                        onChangeValue={(e) => {
                            setRegisterPassword(e.target.value);
                            setRegisterMessage(null);
                        }}
                        type="password"
                        id={"registerPass"}
                        name={"registerPass"}
                    />

                    <div className="text-sm flex flex-col gap-[7px] ">
                        <div className="flex gap-[10px] items-center">
                            <input
                                type="checkbox"
                                checked={registerRulesCheckBox}
                                onChange={() =>
                                    setRegisterRulesCheckBox(
                                        !registerRulesCheckBox
                                    )
                                }
                            />
                            <div className="text-sm text-white/60">
                                Я погоджуюсь з{" "}
                                <span className="text-blue-400 hover:text-blue-300 underline">
                                    правилами магазину
                                </span>
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
                            />
                            <div className="text-sm text-white/60">
                                Згідний отримувати комерційні пропозиції від{" "}
                                <span className="text-blue-400 hover:text-blue-300 underline">
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

                    <button
                        className="text-white bg-transparent px-[15px] py-[15px] rounded-xl font-bold border border-white/15 hover:border-white/60 hover:bg-black/40 cursor-pointer disabled:cursor-not-allowed transition-all duration-200 disabled:text-gray-500 disabled:border-white/10 disabled:bg-white/0"
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
