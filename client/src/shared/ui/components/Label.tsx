interface LabelProps {
    children: React.ReactNode;
}

function Label({ children }: LabelProps) {
    return <label className="font-semibold text-sm">{children}</label>;
}

export default Label;
