import Link from "next/link";

interface EmptyCategoriesProps {
    title: string;
    subtitle: string;
}

export function EmptyCategories({ title, subtitle }: EmptyCategoriesProps) {
    return (
        <div className="relative">
            <div className="absolute opacity-0 hover:opacity-100 bg-black/80 backdrop-blur-xl w-full h-full font-thin text-3xl text-white z-[1] transition-all duration-400 flex items-center justify-center">
                <div className="absolute top-[50%] translate-y-[-50%] left-[2%] w-[20%] text-base text-white">
                    {title}
                </div>
                <div className="flex flex-col gap-[10px]">
                    {["Instagram", "Telegram", "Facebook"].map((name) => (
                        <Link
                            key={name}
                            href={"#"}
                            className="flex items-center pr-[9%] w-full h-full"
                        >
                            <div className="border-b border-transparent hover:border-white">
                                {name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="group flex flex-col">
                <div className="absolute bg-black/25 border border-white/10 shadow-xl px-[50px] py-[15px] backdrop-blur-lg rounded-xl top-[50%] translate-y-[-50%] text-white text-3xl md:text-xl font-thin left-[10%] translate-x-[-10%]">
                    {subtitle}
                </div>
                <img
                    src="/images/studio.png"
                    alt="empty-category"
                    className="w-full h-[500px] object-cover filter transition-all duration-600"
                />
            </div>
        </div>
    );
}
