import { UseFormRegisterReturn } from "react-hook-form";
import { Label } from "../components";

interface BasicTextareaProps {
    label: string;
    register?: UseFormRegisterReturn;
    className?: string;
    errorMessage?: string;
}

export function BasicTextarea({
    label,
    register,
    className,
    errorMessage,
}: BasicTextareaProps) {
    return (
        <div className="flex flex-col gap-[7px]">
            <Label>{label}</Label>
            <textarea
                {...register}
                onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                }}
                className={`resize-none border ${
                    errorMessage ? "border-red-500" : "border-white/10"
                } p-[10px] bg-black/10 outline-0 resize-none overflow-hidden ${className}`}
            />
            {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
        </div>
    );
}
