import { StatCard } from "@/shared/components/cards/StatCard";

interface CategoriesStatsCardsProps {
    totalCategories: number;
    mostPopularCategory: any;
    highestSalesCategory: { name: string; salesSum: number } | null;
}

export function CategoriesStatsCards({
    totalCategories,
    mostPopularCategory,
    highestSalesCategory,
}: CategoriesStatsCardsProps) {
    return (
        <div className="w-1/3 lg:w-full grid grid-cols-2 xxs:grid-cols-1 gap-[15px]">
            <StatCard title="Number of categories" value={totalCategories} />
            <StatCard
                title="Most popular category"
                value={mostPopularCategory?.name || "-"}
            />
            <StatCard
                title="Category with the highest sales volume"
                value={
                    highestSalesCategory
                        ? `${
                              highestSalesCategory.name
                          } (${highestSalesCategory.salesSum.toFixed(2)} $)`
                        : "-"
                }
            />
        </div>
    );
}
