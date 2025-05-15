import { collections } from "@/data/collections";
import Link from "next/link";

export default function HomePage() {
    return (
        <>
            <div className="collections-list">
                <h3 className="mt-[30px] text-xl uppercase font-bold">
                    Колекції
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-[30px]">
                    {collections.map((collection, i) => (
                        <li key={i}>
                            <Link
                                href={`/${collection.path}`}
                                className="relative group"
                            >
                                <div
                                    className="absolute top-0 left-0 bg-black text-white px-[25px] py-[15px] text-lg z-10 
                                            group-hover:bg-white group-hover:text-black transition-colors duration-300"
                                >
                                    {collection.name}
                                </div>
                                <img
                                    src={collection.banner}
                                    alt={collection.name}
                                    className="w-full h-[100vh] object-cover filter transition-all duration-300"
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
