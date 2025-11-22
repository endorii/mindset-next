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
        <div className="flex flex-col gap-[3px]">
            <Label>{label}</Label>
            <textarea
                {...register}
                onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                }}
                className={`resize-none border font-light ${
                    errorMessage ? "border-red-500" : "border-white/5"
                } p-[10px] bg-black/10 outline-0 resize-none overflow-hidden max-h-[150px] ${className} overflow-y-auto`}
            />
            {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
        </div>
    );
}
