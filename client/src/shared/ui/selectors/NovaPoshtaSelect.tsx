import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Label from "../components/Label";

interface INovaPoshtaOption {
    Ref: string;
    Description: string;
}

interface NovaPoshtaSelectProps {
    label: string;
    options: INovaPoshtaOption[];
    value?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    register?: UseFormRegisterReturn;
    disabled?: boolean;
    errorMessage?: string;
}

export const NovaPoshtaSelect = ({
    label,
    options,
    value,
    onChange,
    register,
    disabled = false,
    errorMessage,
}: NovaPoshtaSelectProps) => {
    return (
        <div className="flex flex-col w-full">
            <Label>{label}</Label>
            <select
                className={`border px-[10px] py-[10px] rounded bg-black/20 text-white outline-none ${
                    errorMessage ? "border-red-500" : "border-white/10"
                }`}
                value={value}
                onChange={(e) => {
                    onChange?.(e);
                    register?.onChange?.(e);
                }}
                onBlur={register?.onBlur}
                name={register?.name}
                ref={register?.ref}
                disabled={disabled}
            >
                <option value="" disabled>
                    {`Оберіть ${label.toLowerCase()}`}
                </option>
                {options.map((option) => (
                    <option key={option.Ref} value={option.Ref}>
                        {option.Description}
                    </option>
                ))}
            </select>
            {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
            )}
        </div>
    );
};
