"use client";

import { CloseIcon } from "@/shared/icons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { useRouter } from "next/navigation";

const OrderCancelPage = () => {
    const router = useRouter();
    return (
        <div className="min-h-screen flex text-white items-center justify-center">
            <div className="flex flex-col gap-[10px] bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px] max-w-xl">
                <div className="flex flex-col items-center gap-[15px] text-center">
                    <div className="flex flex-col gap-[20px] items-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-800 rounded-full">
                            <CloseIcon className="w-[40px] fill-none stroke-3 stroke-white" />
                        </div>
                        <div className="text-5xl font-perandory tracking-wider">
                            Payment canceled
                        </div>
                    </div>
                    <p className="text-neutral-400 font-light">
                        Your order has not been processed. Don't worry, you
                        haven't been charged.
                    </p>
                </div>

                <hr className="border-t border-white/5 w-full" />

                <div className="flex flex-col gap-3">
                    <MonoButtonUnderlined
                        className="mt-[10px]"
                        onClick={() => {
                            router.push("/");
                        }}
                    >
                        To main page
                    </MonoButtonUnderlined>
                </div>
            </div>
        </div>
    );
};

export default OrderCancelPage;
