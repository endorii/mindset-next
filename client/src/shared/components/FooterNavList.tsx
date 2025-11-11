interface FooterNavListProps {
    title: string;
    children: React.ReactNode;
}

export function FooterNavList({ title, children }: FooterNavListProps) {
    return (
        <div className="flex flex-col gap-[15px] w-full">
            <div className="text-xl font-bold">{title}</div>
            <div className="flex flex-col gap-[10px]">{children}</div>
        </div>
    );
}
