import { ChangeEvent } from "react";

export interface InputFieldProps {
    label?: string;
    value: string | number;
    onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    type: string;
    className?: string;
    children?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChangeValue,
    id,
    name,
    placeholder,
    disabled,
    required,
    type = "text",
    className = "border border-white/5 rounded px-[10px] py-[8px] bg-white/5 outline-0  transition-colors duration-200",
    children,
}) => (
    <>
        <div className="flex flex-col gap-[7px]">
            <label htmlFor={id} className="text-sm font-semibold">
                {label}:
            </label>
            <input
                id={id}
                name={name}
                type={type}
                className={className}
                placeholder={placeholder}
                value={value}
                required={required}
                disabled={disabled}
                onChange={onChangeValue}
            />
        </div>
        {children}
    </>
);

export default InputField;
