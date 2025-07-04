import Link from "next/link";

interface IMonoLinkProps {
    href: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

function MonoLink({ href, children }: IMonoLinkProps) {
    return (
        <Link
            href={href}
            className="group text-white px-[20px] bg-black/0 py-[15px] text-center border border-white/10 rounded-xl hover:bg-white hover:text-black hover:border-black cursor-pointer transition-all duration-300"
        >
            {children}
        </Link>
    );
}

export default MonoLink;
