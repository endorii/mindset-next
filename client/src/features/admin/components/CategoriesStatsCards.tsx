import { ICategory } from "@/features/categories/types/categories.types";
import StatCard from "@/shared/components/cards/StatCard";

interface CategoriesStatsCardsProps {
    totalCategories: number;
    mostPopularCategory: any;
    highestSalesCategory: { name: string; salesSum: number } | null;
}

export default function CategoriesStatsCards({
    totalCategories,
    mostPopularCategory,
    highestSalesCategory,
}: CategoriesStatsCardsProps) {
    return (
        <div className="w-1/3 lg:w-full grid grid-cols-2 xxs:grid-cols-1 gap-[15px]">
            <StatCard title="Кількість категорій" value={totalCategories} />
            <StatCard
                title="Найпопулярніша категорія"
                value={mostPopularCategory?.name || "-"}
            />
            <StatCard
                title="Категорія з найбільшим обсягом продажів"
                value={
                    highestSalesCategory
                        ? `${
                              highestSalesCategory.name
                          } (${highestSalesCategory.salesSum.toFixed(2)} ₴)`
                        : "-"
                }
            />
        </div>
    );
}
