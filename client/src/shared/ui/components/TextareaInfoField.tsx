import { Label } from "./Label";

interface TextareaInfoFieldProps {
    label: string;
    value: string;
}

export function TextareaInfoField({ label, value }: TextareaInfoFieldProps) {
    return (
        <div className="flex flex-col gap-[7px]">
            <Label>{label}</Label>
            <div className="border break-words border-white/10 bg-black/10 px-[10px] py-[7px] max-h-[130px] w-full overflow-y-auto">
                {value || "Not specified"}
            </div>
        </div>
    );
}
