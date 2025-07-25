export interface InfoFieldProps {
    label: string;
    value: React.ReactNode;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => (
    <div className="flex flex-col gap-[7px] w-[300px]">
        <label className="font-semibold text-sm">{label}:</label>
        <div className="border border-white/10 bg-black/10 rounded px-[10px] py-[7px] ">
            {value}
        </div>
    </div>
);

export default InfoField;
