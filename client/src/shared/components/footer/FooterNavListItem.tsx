import Link from "next/link";

interface FooterNavListItemProps {
    href: string;
    children: React.ReactNode;
}

export function FooterNavListItem({ href, children }: FooterNavListItemProps) {
    return (
        <Link
            href={href}
            className="text-neutral-200 text-sm hover:text-white hover:underline"
        >
            {children}
        </Link>
    );
}
