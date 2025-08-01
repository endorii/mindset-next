interface FooterNavListProps {
    title: string;
    children: React.ReactNode;
}

function FooterNavList({ title, children }: FooterNavListProps) {
    return (
        <div className="flex flex-col gap-[20px] w-full">
            <div className="text-xl font-bold">{title}</div>
            <div className="flex flex-col gap-[10px]">{children}</div>
        </div>
    );
}

export default FooterNavList;
