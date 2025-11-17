import Link from "next/link";

interface IMonoLinkProps {
    href: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

export function MonoLink({ href, disabled, children }: IMonoLinkProps) {
    return (
        <Link
            href={href}
            className={`block text-xl font-perandory tracking-wider border-b border-transparent hover:border-white transition-all duration-300 text-center ${
                disabled && "disabled:cursor-not-allowed"
            }`}
        >
            {children}
        </Link>
    );
}
