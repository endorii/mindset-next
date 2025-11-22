import Link from "next/link";

interface IAdminNavigationLinkProps {
    href: string;
    navOpen?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

export function AdminNavigationLink({
    href,
    navOpen,
    children,
    onClick,
}: IAdminNavigationLinkProps) {
    return (
        <Link
            key={href}
            href={href}
            onClick={onClick}
            className={`flex gap-[15px] py-[13px] font-perandory tracking-wider text-xl cursor-pointer p-[13px] bg-black/40 border border-white/5 hover:bg-white group transition-all duration-300 ${
                navOpen ? "px-[25px]" : "px-[13px]"
            }`}
        >
            <div
                className={`truncate flex items-center gap-[15px] w-full text-white hover:text-black ${
                    navOpen ? "justify-start" : "items-end"
                }`}
            >
                {children}
            </div>
        </Link>
    );
}
