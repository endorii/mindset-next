import { UseFormRegisterReturn } from "react-hook-form";
import { Label } from "../components";

interface BasicSelectorProps<T> {
    label: string;
    register: UseFormRegisterReturn;
    itemsList: T[];
    basicOptionLabel: string;
    getOptionValue: (item: T) => boolean;
    getOptionLabel: (item: T) => boolean;
    className?: string;
    errorMessage?: string;
    disabled?: boolean;
}

export function BasicSelector<T>({
    label,
    register,
    itemsList,
    basicOptionLabel,
    getOptionValue,
    getOptionLabel,
    className = "",
    errorMessage,
    disabled,
}: BasicSelectorProps<T>) {
    return (
        <div className="flex flex-col gap-[3px]">
            <Label>{label}</Label>
            <select
                {...register}
                className={`border font-light ${
                    errorMessage ? "border-red-500" : "border-white/5"
                } p-[11.5px] outline-0 cursor-pointer ${className}`}
                disabled={disabled}
            >
                <option value="" disabled hidden>
                    {basicOptionLabel}
                </option>
                {itemsList.map((item, i) => (
                    <option key={i} value={String(getOptionValue(item))}>
                        {getOptionLabel(item)}
                    </option>
                ))}
            </select>
            {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
        </div>
    );
}
