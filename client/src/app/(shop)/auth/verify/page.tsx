"use client";

import {
    useResendVerification,
    useVerifyUser,
} from "@/features/auth/hooks/useAuth";
import { MonoButton } from "@/shared/ui/buttons";
import { InputField } from "@/shared/ui/inputs/InputField";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const VerifyPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    const [email, setEmail] = useState("");

    const verifyMutation = useVerifyUser();
    const resendMutation = useResendVerification();

    useEffect(() => {
        if (!token) {
            toast.info("Verification token not found or expired");
            router.push("/auth");
            return;
        }

        verifyMutation.mutateAsync(token);
    }, [token, router]);

    return (
        <div className="flex flex-col gap-4 items-center h-[70vh] justify-center text-white p-[20px] w-full overflow-y-auto">
            <div
                className={`text-lg font-medium p-[15px] ${
                    verifyMutation.isPending
                        ? ""
                        : verifyMutation.isSuccess
                        ? "bg-green-500/10 border border-green-500"
                        : verifyMutation.isError
                        ? "bg-red-500/10 border border-red-500"
                        : null
                }`}
            >
                {verifyMutation.isPending
                    ? "Confirming email, please wait..."
                    : verifyMutation.isSuccess
                    ? "✅ Email successfully verified"
                    : verifyMutation.isError
                    ? "❌ Invalid or expired token. To send a new one, enter your email below."
                    : null}
            </div>

            {verifyMutation.isError && (
                <div className="flex flex-col gap-2 items-center">
                    <InputField
                        label="E-mail"
                        type="email"
                        placeholder="Enter your e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <MonoButton
                        onClick={() => resendMutation.mutate(email)}
                        disabled={resendMutation.isPending || !email}
                    >
                        {resendMutation.isPending ? "Sending..." : "Resend"}
                    </MonoButton>
                </div>
            )}
        </div>
    );
};

export default VerifyPage;
