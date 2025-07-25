import { ChangeEvent, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value?: string | number;
    onChangeValue?: (e: ChangeEvent<HTMLInputElement>) => void;
    register?: UseFormRegisterReturn;
    className?: string;
    errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChangeValue,
    register,
    id,
    name,
    placeholder,
    disabled,
    required,
    type = "text",
    errorMessage,
    className,
    ...rest
}) => {
    const inputId = id || name;
    const inputClassName =
        className ??
        `border ${errorMessage ? "border-red-500" : "border-white/10"} 
     rounded px-[10px] py-[8px] outline-0 bg-black/10 text-white transition-colors duration-200 w-[300px]`;

    return (
        <div className="flex flex-col gap-[7px]">
            {label && (
                <label htmlFor={inputId} className="text-sm font-semibold">
                    {label}
                </label>
            )}

            <input
                id={inputId}
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={inputClassName}
                {...(value !== undefined && { value })}
                {...(onChangeValue && { onChange: onChangeValue })}
                {...register}
                {...rest}
            />

            {errorMessage && (
                <span className="text-sm text-red-500">{errorMessage}</span>
            )}
        </div>
    );
};

export default InputField;
