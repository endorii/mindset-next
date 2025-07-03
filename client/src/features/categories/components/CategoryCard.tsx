import Image from "next/image";
import Link from "next/link";
import { ICategory } from "../types/categories.types";
import { declOfNum } from "@/shared/utils/helpers";

interface ICategoryCardProps {
    collectionPath: string;
    item: ICategory;
    i: number;
}
function CategoryCard({ collectionPath, item, i }: ICategoryCardProps) {
    console.log(item);

    return (
        <li key={i}>
            <Link
                href={`/${collectionPath}/${item.path}`}
                className="flex flex-col gap-[15px] group rounded-xl bg-white/5 shadow-lg backdrop-blur-3xl border border-white/5 p-[20px]"
            >
                <div className="flex items-center justify-between">
                    <div className="text-white text-3xl font-thin">
                        {item.name}
                    </div>
                    <div className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[7px] text-sm">
                        {item.products.length}{" "}
                        {declOfNum(item.products.length, [
                            "товар",
                            "товари",
                            "товарів",
                        ])}
                    </div>
                </div>
                <Image
                    className="rounded-xl"
                    width={450}
                    height={450}
                    src={`http://localhost:5000/${item.banner}`}
                    alt={item.name}
                />
            </Link>
        </li>
    );
}

export default CategoryCard;
