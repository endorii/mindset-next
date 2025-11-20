import Link from "next/link";

export function MenuSection({
    title,
    items,
    onItemClick,
}: {
    title: string;
    items: { name: string; href: string }[];
    onItemClick: () => void;
}) {
    return (
        <>
            <div className="flex flex-col gap-[15px] justify-center items-center">
                <div className="text-white relative px-[20px] sm:px-0">
                    <div className="text-6xl md:text-5xl sm:text-4xl font-perandory tracking-wider">
                        {title}
                    </div>
                </div>
                <ul className="flex flex-col gap-[10px] text-2xl md:text-xl xs:text-lg items-center">
                    {items.map(({ name, href }) => (
                        <li
                            key={name}
                            onClick={onItemClick}
                            className="border-b font-light text-neutral-400 hover:text-white border-transparent hover:border-white transition-all duration-200"
                        >
                            <Link href={href}>{name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <hr className="border-t border-white/10 w-full" />
        </>
    );
}
