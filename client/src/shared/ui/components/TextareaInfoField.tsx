interface TextareaInfoFieldProps {
    label: string;
    value: string;
}

function TextareaInfoField({ label, value }: TextareaInfoFieldProps) {
    return (
        <div className="flex flex-col gap-[7px]">
            <label className="font-semibold text-sm">{label}</label>
            <div className="border break-words border-white/10 bg-black/10 rounded px-[10px] py-[7px] max-h-[130px] max-w-[990px] overflow-y-auto">
                {value || "Не вказано"}
            </div>
        </div>
    );
}

export default TextareaInfoField;
