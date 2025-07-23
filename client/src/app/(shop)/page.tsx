"use client";

import { useCollections } from "@/features/collections/hooks/useCollections";
import CollectionCard from "@/features/collections/components/CollectionCard";
import DataListWrapper from "@/shared/ui/wrappers/DataListWrapper";
import { useTypewriter } from "@/shared/hooks/useTypewriter";
import Image from "next/image";

export default function HomePage() {
    const { data: collections, error, isLoading, isError } = useCollections();
    const existCollections = collections || [];

    const text = "mindset.";
    const typedText = useTypewriter(text, 160);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return (
            <div>
                Помилка: {error?.message || "Не вдалося отримати колекції"}
            </div>
        );
    }

    return (
        <div className="">
            <div className="">
                <div className="relative flex flex-col text-white h-screen justify-center items-center">
                    <div className="overflow-hidden text-[440px] font-extrabold uppercase tracking-[-0.05em] leading-[350px]">
                        {typedText}

                        {text === typedText ? null : (
                            <span className="animate-pulse text-[440px] font-thin">
                                |
                            </span>
                        )}
                    </div>

                    <div
                        className={`text-5xl px-[40px] font-qwitcher-grypen font-light self-start justify-start transition-all duration-450 ${
                            typedText === text ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        your style - your life vision
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[50px] mt-[100px]">
                <div className="text-white relative">
                    <div className="text-8xl font-extrabold">Колекції</div>
                    <div className="absolute top-[40px] left-0 text-8xl font-qwitcher-grypen text-white/40">
                        Collections
                    </div>
                </div>

                <DataListWrapper
                    existData={existCollections}
                    alternativeText="Немає доступних колекцій."
                >
                    {(item, i) => <CollectionCard item={item} i={i} key={i} />}
                </DataListWrapper>
            </div>
        </div>
    );
}
