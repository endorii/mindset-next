export function Detail({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div className="text-neutral-400 tracking-wider font-perandory text-lg">
                {label}
            </div>
            <div className="text-white font-medium">{value}</div>
        </div>
    );
}
