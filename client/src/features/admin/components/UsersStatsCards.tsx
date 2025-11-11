import { StatCard } from "@/shared/components/cards/StatCard";

interface UsersStatsCardsProps {
    totalUsers: number;
    activeUsersLastMonth: number;
    roleCounts: Record<string, number>;
    usersWithOrdersCount: number;
    avgOrdersPerUser: string | number;
}

export function UsersStatsCards({
    totalUsers,
    activeUsersLastMonth,
    roleCounts,
    usersWithOrdersCount,
    avgOrdersPerUser,
}: UsersStatsCardsProps) {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 xxs:grid-cols-1 gap-[15px]">
            <StatCard
                title="Загальна кількість користувачів"
                value={totalUsers}
            />
            <StatCard
                title="Активні користувачі за останній місяць"
                value={activeUsersLastMonth}
            />
            <StatCard
                title="Користувачі з роллю ADMIN"
                value={roleCounts.ADMIN || 0}
            />
            <StatCard
                title="Користувачі з роллю USER"
                value={roleCounts.USER || 0}
            />
            <StatCard
                title="Користувачі, які зробили замовлення"
                value={usersWithOrdersCount}
            />
            <StatCard
                title="Середня кількість замовлень на користувача"
                value={avgOrdersPerUser}
            />
        </div>
    );
}
