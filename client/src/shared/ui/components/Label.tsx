interface LabelProps {
    children: React.ReactNode;
}

export function Label({ children }: LabelProps) {
    return (
        <label className="font-perandory tracking-wider text-lg">
            {children}
        </label>
    );
}
