import { ButtonHTMLAttributes } from "react";

interface IMonoButtonProps {
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export function MonoButton({
    type = "button",
    onClick,
    disabled = false,
    children,
    className = "",
}: IMonoButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`flex gap-[8px] items-center justify-center group px-[20px] py-[10px] bg-black/60 border border-white/10 rounded-xl text-white hover:bg-white hover:text-black hover:border-black cursor-pointer transition-all duration-300 disabled:bg-white/10 disabled:text-white/20 disabled:border-white/5 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
}
