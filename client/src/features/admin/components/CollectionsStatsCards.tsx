import { StatCard } from "@/shared/components/cards/StatCard";

interface CollectionsStatsCardsProps {
    totalCollections: number;
    mostPopularCollection: any;
    highestSalesCollection: { name: string; salesSum: number } | null;
}

export function CollectionsStatsCards({
    totalCollections,
    mostPopularCollection,
    highestSalesCollection,
}: CollectionsStatsCardsProps) {
    return (
        <div className="w-1/3 lg:w-full grid grid-cols-2 xxs:grid-cols-1 gap-[15px]">
            <StatCard title="Number of collections" value={totalCollections} />
            <StatCard
                title="Most popular collection"
                value={mostPopularCollection?.name || "-"}
            />
            <StatCard
                title="Best-selling collection"
                value={
                    highestSalesCollection
                        ? `${
                              highestSalesCollection.name
                          } (${highestSalesCollection.salesSum.toFixed(2)} $)`
                        : "-"
                }
            />
        </div>
    );
}
