import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Control, Controller } from "react-hook-form";
import { Label } from "../components";

interface BasicSelectorProps<T> {
    label: string;
    control: Control<any>;
    name: string;
    itemsList: T[];
    basicOptionLabel: string;
    getOptionValue: (item: T) => string;
    getOptionLabel: (item: T) => string;
    className?: string;
    errorMessage?: string;
    disabled?: boolean;
}

export function BasicSelector<T>({
    label,
    control,
    name,
    itemsList,
    basicOptionLabel,
    getOptionValue,
    getOptionLabel,
    className = "",
    errorMessage,
    disabled = false,
}: BasicSelectorProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col gap-[3px]">
                    <Label>{label}</Label>

                    <Select
                        value={
                            field.value === undefined ? "" : String(field.value)
                        }
                        onValueChange={(val) => {
                            field.onChange(val === "true"); // конвертуємо назад у boolean
                        }}
                        disabled={disabled}
                    >
                        <SelectTrigger
                            className={`w-full ${className} ${
                                errorMessage
                                    ? "border-red-500"
                                    : "border-white/5"
                            }`}
                        >
                            <SelectValue placeholder={basicOptionLabel} />
                        </SelectTrigger>

                        <SelectContent>
                            {itemsList.map((item, idx) => (
                                <SelectItem
                                    key={idx}
                                    value={getOptionValue(item)}
                                >
                                    {getOptionLabel(item)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                </div>
            )}
        />
    );
}
