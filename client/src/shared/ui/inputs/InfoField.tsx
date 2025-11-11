import { Label } from "../components";

export interface InfoFieldProps {
    label: string;
    value: React.ReactNode;
}

export function InfoField({ label, value }: InfoFieldProps) {
    return (
        <div className="flex flex-col gap-[7px] w-full">
            <Label>{label}</Label>
            <div className="border border-white/10 bg-black/10 rounded px-[10px] py-[7px] ">
                {value}
            </div>
        </div>
    );
}
