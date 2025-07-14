import { ChangeEvent, InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

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
    className = `border ${
        errorMessage ? "border-red-500" : "border-white/10"
    }  rounded px-[10px] py-[8px] outline-0  transition-colors duration-200 bg-black/10 text-white`,

    ...rest
}) => (
    <div className="flex flex-col gap-[7px]">
        {label && (
            <label htmlFor={id || name} className="text-sm font-semibold">
                {label}
            </label>
        )}
        <input
            id={id || name}
            name={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={className}
            value={value}
            onChange={onChangeValue}
            {...register}
            {...rest}
        />
        {errorMessage && (
            <span className="text-sm text-red-500">{errorMessage}</span>
        )}
    </div>
);

export default InputField;
