import Link from "next/link";

interface FooterNavListItemProps {
    href: string;
    children: React.ReactNode;
}

function FooterNavListItem({ href, children }: FooterNavListItemProps) {
    return (
        <Link
            href={href}
            className="text-white/80 text-sm hover:text-white hover:underline"
        >
            {children}
        </Link>
    );
}

export default FooterNavListItem;
