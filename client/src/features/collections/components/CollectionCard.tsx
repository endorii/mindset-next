import { ICollection } from "../types/collections.types";
import MonoLink from "@/shared/ui/buttons/MonoLink";

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
            <div className="group flex flex-col">
                <div className="flex flex-col gap-[20px] p-[20px]">
                    <div
                        className={`text-white text-7xl font-thin font-qwitcher-grypen`}
                    >
                        {item.name}
                    </div>
                    <MonoLink href={`/${item.path}`}>
                        Переглянути колекцію
                    </MonoLink>
                </div>
                <img
                    src={`http://localhost:5000/${item.banner}`}
                    alt={item.name}
                    className="w-full h-[350px] object-cover filter transition-all duration-600 rounded-xl"
                />
            </div>
        </li>
    );
}

export default CollectionCard;
