import { UseFormRegisterReturn } from "react-hook-form";
import Label from "../components/Label";

interface BasicSelectorProps<T> {
    label: string;
    register: UseFormRegisterReturn;
    itemsList: T[];
    basicOptionLabel: string;
    getOptionValue: (item: T) => string | number;
    getOptionLabel: (item: T) => string;
    className?: string;
    errorMessage?: string;
    disabled?: boolean;
}

function BasicSelector<T>({
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
        <div className="flex flex-col gap-[7px]">
            <Label>{label}</Label>
            <select
                {...register}
                className={`border ${
                    errorMessage ? "border-red-500" : "border-white/10"
                } rounded p-[10px] outline-0 cursor-pointer ${className}`}
                disabled={disabled}
            >
                <option value="" disabled hidden>
                    {basicOptionLabel}
                </option>
                {itemsList.map((item) => (
                    <option
                        key={getOptionValue(item)}
                        value={getOptionValue(item)}
                    >
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

export default BasicSelector;
