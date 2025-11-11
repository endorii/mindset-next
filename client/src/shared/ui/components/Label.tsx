interface LabelProps {
    children: React.ReactNode;
}

export function Label({ children }: LabelProps) {
    return <label className="font-semibold text-sm">{children}</label>;
}
