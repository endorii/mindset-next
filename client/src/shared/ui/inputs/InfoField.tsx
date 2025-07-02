export interface InfoFieldProps {
    label: string;
    value: React.ReactNode;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => (
    <div className="flex flex-col gap-[7px] ">
        <label className="font-semibold text-sm">{label}:</label>
        <div className="border border-white/5 rounded px-[10px] py-[7px] bg-white/5">
            {value}
        </div>
    </div>
);

export default InfoField;
