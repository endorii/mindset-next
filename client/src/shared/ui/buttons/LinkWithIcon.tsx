import Link from "next/link";

interface ILinkWithIconProps {
    href: string;
    counter: number;
    children: React.ReactNode;
    className?: string;
}

export function LinkWithIcon({
    href,
    counter,
    children,
    className,
}: ILinkWithIconProps) {
    return (
        <Link
            href={href}
            className={`relative group border border-white/5 hover:bg-white hover:text-black transition-colors duration-300 px-3 py-2 cursor-pointer ${className}`}
        >
            {counter ? (
                <div className="absolute top-[-5px] right-[-5px] bg-none w-[20px] h-[20px] flex items-center justify-center text-[11px] font-bold border-2 border-white text-white pt-[1px] z-[10] bg-black">
                    {counter}
                </div>
            ) : null}
            {children}
        </Link>
    );
}
