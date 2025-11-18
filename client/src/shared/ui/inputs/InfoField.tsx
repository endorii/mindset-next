import { Label } from "../components";

export interface InfoFieldProps {
    label: string;
    value: React.ReactNode;
}

export function InfoField({ label, value }: InfoFieldProps) {
    return (
        <div className="flex flex-col gap-[3px] w-full">
            <Label>{label}</Label>
            <div className="border border-white/10 bg-black/10 px-[10px] py-[7px] font-light">
                {value}
            </div>
        </div>
    );
}
