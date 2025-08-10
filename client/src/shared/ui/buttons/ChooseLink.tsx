import { ICollection } from "@/features/collections/types/collections.types";
import Link from "next/link";

interface IChooseLinkProps {
    href: string;
    onClick: () => void;
    children: React.ReactNode;
    currentCollection?: ICollection | null;
    collection?: ICollection;
}

function ChooseLink({
    href,
    onClick,
    currentCollection,
    collection,
    children,
}: IChooseLinkProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`border border-white/10 shadow-lg rounded-xl hover:bg-white hover:text-black transition-colors duration-300 w-[100px] flex items-center justify-center cursor-pointer px-[20px] py-[10px] ${
                currentCollection?.path === collection?.path
                    ? "bg-white text-black"
                    : "bg-black/80 text-white"
            }`}
        >
            {children}
        </Link>
    );
}

export default ChooseLink;
