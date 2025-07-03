import Link from "next/link";
import { ICollection } from "../types/collections.types";

interface ICollectionCardProps {
    item: ICollection;
    i: number;
}

function CollectionCard({ item, i }: ICollectionCardProps) {
    return (
        <li
            key={i}
            className="rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[10px]"
        >
            <Link href={`/${item.path}`} className="group flex flex-col">
                <div className="flex flex-col gap-[20px] p-[20px]">
                    <div className="text-white text-3xl font-thin">
                        {item.name}
                    </div>
                    <button className="p-[15px] text-white rounded-xl border border-white/10 hover:bg-black/50 transition-all duration-300 disabled:border-white/10 cursor-pointer">
                        Переглянути колекцію
                    </button>
                </div>
                <img
                    src={`http://localhost:5000/${item.banner}`}
                    alt={item.name}
                    className="w-full h-[350px] object-cover filter transition-all duration-600 rounded-xl"
                />
            </Link>
        </li>
    );
}

export default CollectionCard;
