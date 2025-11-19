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
            <StatCard title="Total number of users" value={totalUsers} />
            <StatCard
                title="Active users in the last month"
                value={activeUsersLastMonth}
            />
            <StatCard
                title="Users with the ADMIN role"
                value={roleCounts.ADMIN || 0}
            />
            <StatCard
                title="Users with the USER role"
                value={roleCounts.USER || 0}
            />
            <StatCard
                title="Users who placed an order"
                value={usersWithOrdersCount}
            />
            <StatCard
                title="Average number of orders per user"
                value={avgOrdersPerUser}
            />
        </div>
    );
}
