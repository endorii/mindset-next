"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Label } from "../components";

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

export function NovaPoshtaSelect({
    label,
    options,
    value,
    onChange,
    register,
    disabled = false,
    errorMessage,
}: NovaPoshtaSelectProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <Label>{label}</Label>

            <Select
                disabled={disabled}
                value={value}
                onValueChange={(val) => {
                    const event = {
                        target: { value: val },
                    } as ChangeEvent<HTMLSelectElement>;
                    onChange?.(event);
                    register?.onChange?.(event);
                }}
            >
                <SelectTrigger
                    className={`w-full min-h-[45px] border px-3 py-2 bg-black/20 text-white outline-none ${
                        errorMessage ? "border-red-500" : "border-white/10"
                    }`}
                >
                    <SelectValue
                        placeholder={`Choose ${label.toLowerCase()}`}
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map((option) => (
                            <SelectItem key={option.Ref} value={option.Ref}>
                                {option.Description}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
            )}
        </div>
    );
}
