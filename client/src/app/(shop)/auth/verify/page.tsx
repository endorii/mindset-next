"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    useVerifyUser,
    useResendVerification,
} from "@/features/auth/hooks/useAuth";
import InputField from "@/shared/ui/inputs/InputField";
import { MonoButton } from "@/shared/ui/buttons";

const VerifyPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    const [email, setEmail] = useState("");

    const verifyMutation = useVerifyUser();
    const resendMutation = useResendVerification();

    useEffect(() => {
        if (!token) {
            router.push("/auth");
            return;
        }

        verifyMutation.mutate(token, {
            onSuccess: () => {
                setTimeout(() => router.push("/auth"), 2500);
            },
        });
    }, [token, router]);

    return (
        <div className="flex flex-col gap-4 items-center h-[70vh] justify-center text-white p-[20px] w-full overflow-y-auto">
            <div
                className={`text-lg font-medium p-[15px] ${
                    verifyMutation.isPending
                        ? ""
                        : verifyMutation.isSuccess
                        ? "bg-green-500/10 border border-green-500 rounded-xl"
                        : verifyMutation.isError
                        ? "bg-red-500/10 border border-red-500 rounded-xl"
                        : null
                }`}
            >
                {verifyMutation.isPending
                    ? "Підтвердження пошти, зачекайте..."
                    : verifyMutation.isSuccess
                    ? "✅ Пошта успішно підтверджена"
                    : verifyMutation.isError
                    ? "❌ Недійсний або застарілий токен. Щоб надіслати новий, введіть вашу електронну пошту нижче"
                    : null}
            </div>

            {verifyMutation.isError && (
                <div className="flex flex-col gap-2 items-center">
                    <InputField
                        label="Електронна пошта"
                        type="email"
                        placeholder="Введіть ваш email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <MonoButton
                        onClick={() => resendMutation.mutate(email)}
                        disabled={resendMutation.isPending || !email}
                    >
                        {resendMutation.isPending
                            ? "Надсилаємо..."
                            : "Надіслати повторно"}
                    </MonoButton>
                </div>
            )}
        </div>
    );
};

export default VerifyPage;
