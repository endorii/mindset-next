"use client";

import { useEffect } from "react";

interface IModalWrapperProps {
    onClose: () => void;
    children: React.ReactNode;
    modalTitle: string;
}

export function ModalWrapper({
    onClose,
    children,
    modalTitle,
}: IModalWrapperProps) {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black/85 flex items-center products-center justify-center z-100 cursor-pointer px-[40px] sm:p-0"
            onClick={onClose}
        >
            <div
                className="flex flex-col gap-[17px] bg-black text-white bg-gradient-to-br from-black/0 to-white/3 border border-white/5 p-[40px] sm:px-[10px] sm:py-[20px] pb-[25px] h-full max-h-[80vh] sm:max-h-full min-w-[800px] md:min-w-auto sm:min-w-full shadow-lg overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 className="text-4xl font-perandory tracking-wider">
                    {modalTitle}
                </h4>
                <hr className="border-t border-white/5" />
                {children}
            </div>
        </div>
    );
}
