import { ButtonHTMLAttributes } from "react";

interface IMonoButtonUnderlinedProps {
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export function MonoButtonUnderlined({
    type = "button",
    onClick,
    disabled,
    children,
    className = "",
}: IMonoButtonUnderlinedProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`flex gap-[8px] items-center justify-center group  text-xl font-perandory tracking-wider transition-all duration-300 disabled:text-neutral-600 disabled:border-white/5 disabled:cursor-not-allowed  ${className}`}
        >
            <div className="text-white border-b border-transparent hover:border-b-white">
                {children}
            </div>
        </button>
    );
}
