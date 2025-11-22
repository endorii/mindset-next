import Link from "next/link";

export function PreOrderInfo() {
    return (
        <div className="mt-2 bg-white/5 border p-[15px] border-white/5 shadow-inner">
            <div className="text-white font-medium">
                The data you enter is used to automatically create an express
                invoice in the Nova Post system.
            </div>

            <div className="text-white italic text-xs mt-[10px]">
                Please check the address before confirming the order. If you
                change your number or city, update your account information or
                contact{" "}
                <Link href="#" className="text-blue-400 underline">
                    technical support
                </Link>
                .
            </div>
        </div>
    );
}
