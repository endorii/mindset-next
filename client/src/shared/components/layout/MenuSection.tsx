import Link from "next/link";

export function MenuSection({
    title,
    subtitle,
    items,
    onItemClick,
}: {
    title: string;
    subtitle: string;
    items: { name: string; href: string }[];
    onItemClick: () => void;
}) {
    return (
        <div className="flex sm:flex-col gap-[15px] justify-between">
            <div className="text-white relative px-[20px] sm:px-0">
                <div className="text-6xl md:text-5xl font-extrabold">
                    {title}
                </div>
                <div className="absolute top-[0px] md:top-[20px] sm:top-[10px] text-8xl md:text-7xl font-qwitcher-grypen text-neutral-300">
                    {subtitle}
                </div>
            </div>
            <ul className="flex flex-col gap-[20px] text-2xl items-end sm:items-start sm:mt-[40px]">
                {items.map(({ name, href }) => (
                    <li
                        key={name}
                        onClick={onItemClick}
                        className="border-b border-transparent hover:border-white transition-all duration-200"
                    >
                        <Link href={href}>{name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
