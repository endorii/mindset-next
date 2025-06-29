import { ChangeEvent } from "react";

export interface BasicInputProps {
    label?: string;
    value?: string | number;
    onChangeValue?: (e: ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    type?: string;
    className?: string;
    children?: React.ReactNode;
}

const BasicInput: React.FC<BasicInputProps> = ({
    label,
    value,
    onChangeValue,
    id,
    name,
    placeholder,
    disabled,
    required,
    type = "text",
    className = "mb-2 border-b outline-0 text-sm w-full p-[10px]",
    children,
}) => (
    <div className="relative flex flex-col gap-[4px]">
        {label ? (
            <label htmlFor={id} className="text-xs text-gray-600">
                {label}:
            </label>
        ) : null}
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
        {children}
    </div>
);

export default BasicInput;
