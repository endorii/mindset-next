interface FooterNavListProps {
    title: string;
    children: React.ReactNode;
}

export function FooterNavList({ title, children }: FooterNavListProps) {
    return (
        <div className="flex flex-col gap-[15px] w-full">
            <div className="text-xl font-bold font-perandory tracking-wider">
                {title}
            </div>
            <div className="flex flex-col gap-[10px] font-light">
                {children}
            </div>
        </div>
    );
}
