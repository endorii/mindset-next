import { Label } from "./Label";

interface TextareaInfoFieldProps {
    label: string;
    value: string;
}

export function TextareaInfoField({ label, value }: TextareaInfoFieldProps) {
    return (
        <div className="flex flex-col gap-[3px]">
            <Label>{label}</Label>
            <div className="border break-words border-white/5 font-light bg-black/10 px-[10px] py-[7px] max-h-[150px] overflow-y-auto">
                {value || "-"}
            </div>
        </div>
    );
}
