import Link from "next/link";

interface INavigationLinkProps {
    href: string;
    onClick?: () => void;
    children: React.ReactNode;
}

function NavigationLink({ href, onClick, children }: INavigationLinkProps) {
    return (
        <Link
            key={href}
            href={href}
            className={`flex gap-[15px] py-[13px] items-center cursor-pointer bg-black/40 px-[20px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 `}
            onClick={onClick}
        >
            <div className={`flex items-center gap-[15px] w-full `}>
                {children}
            </div>
        </Link>
    );
}

export default NavigationLink;
