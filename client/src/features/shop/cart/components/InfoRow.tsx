export function InfoRow({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="flex gap-[7px] items-center ">
            <div className="sm:text-sm xxs:text-xs">{label}: </div>
            <div className="text-white font-perandory tracking-wider mt-0.5 text-lg sm:text-base xxs:text-sm">
                {value}
            </div>
        </div>
    );
}
