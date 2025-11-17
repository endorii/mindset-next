import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import Image from "next/image";
import Link from "next/link";

interface CollectionsAndCategoriesListProps {
    items: ICollection[] | ICategory[];
    basePath?: string;
}

export function CollectionsAndCategoriesList({
    items,
    basePath = "",
}: CollectionsAndCategoriesListProps) {
    return (
        <div className="grid grid-cols-3 gap-[15px] w-full">
            {items.map((item, i) => (
                <div key={i} className="relative cursor-pointer">
                    <div className="absolute opacity-0 hover:opacity-100 bg-black/80 backdrop-blur-xl w-full h-full font-thin text-3xl text-white z-[1] transition-all duration-400 flex items-center justify-center">
                        <Link
                            className="flex items-center w-full h-full justify-center"
                            href={`${basePath}/${item.path}`}
                        >
                            <div className="border-b border-white font-perandory">
                                View
                            </div>
                        </Link>
                    </div>

                    <div className="group flex flex-col">
                        <div
                            className={`absolute font-perandory tracking-wider left-[30px] top-[30px] text-white text-3xl font-thin 
    drop-shadow-sm/40`}
                        >
                            {item.name}
                        </div>
                        <Image
                            src={item.banner}
                            alt={item.name}
                            width={1000}
                            height={1000}
                            className="w-full h-[750px] object-cover filter transition-all duration-600"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
