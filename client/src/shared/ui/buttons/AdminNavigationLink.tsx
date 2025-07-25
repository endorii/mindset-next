import Link from "next/link";

interface IAdminNavigationLinkProps {
    href: string;
    navOpen?: boolean;
    children: React.ReactNode;
}

function AdminNavigationLink({
    href,
    navOpen,
    children,
}: IAdminNavigationLinkProps) {
    return (
        <Link
            key={href}
            href={href}
            className={`flex gap-[15px] py-[13px] items-center cursor-pointer p-[10px] bg-black/40 border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 ${
                navOpen ? "px-[25px]" : "px-[10px]"
            }`}
        >
            <div
                className={`truncate flex items-center gap-[20px] w-full text-white hover:text-black ${
                    navOpen ? "justify-start" : "justify-center"
                }`}
            >
                {children}
            </div>
        </Link>
    );
}

export default AdminNavigationLink;
