export function InfoRow({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="flex gap-[7px] items-center">
            <div>{label}: </div>
            <div className="text-white font-perandory tracking-wider mt-0.5 text-lg">
                {value}
            </div>
        </div>
    );
}
