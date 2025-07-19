import Link from "next/link";

interface IMonoLinkProps {
    href: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

function MonoLink({ href, disabled, children }: IMonoLinkProps) {
    const baseClasses =
        "group text-white px-[20px] py-[15px] text-center border rounded-xl transition-all duration-300";

    const enabledClasses =
        "bg-black/0 border-white/10 hover:bg-white hover:text-black hover:border-black cursor-pointer";

    const disabledClasses =
        "text-white/20 cursor-not-allowed bg-black/10 border-white/10";

    if (disabled) {
        return (
            <span className={`${baseClasses} ${disabledClasses}`}>
                {children}
            </span>
        );
    }

    return (
        <Link href={href} className={`${baseClasses} ${enabledClasses}`}>
            {children}
        </Link>
    );
}

export default MonoLink;
