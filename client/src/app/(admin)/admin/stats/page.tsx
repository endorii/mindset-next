"use client";

import Title from "@/features/admin/attributes/components/Title";
import CategoriesStatsCards from "@/features/admin/components/CategoriesStatsCards";
import CollectionsStatsCards from "@/features/admin/components/CollectionsStatsCards";
import OrdersStatsCards from "@/features/admin/components/OrdersStatsCards";
import UsersStatsCards from "@/features/admin/components/UsersStatsCards";
import { useAllUsers } from "@/features/admin/hooks/useUsers";
import { useOrders } from "@/features/orders/hooks/useOrders";
import {
    OrdersAndSalesChart,
    OrdersByCollectionsChart,
    OrdersByCategoriesChart,
} from "@/shared/components/charts";
import UsersRegistrationChart from "@/shared/components/charts/UsersRegistrationsChart";
import { ErrorWithMessage } from "@/shared/ui/components";
import {
    LineChartSkeleton,
    FastStatSkeleton,
    PieChartSkeleton,
    FastStatMiniSkeleton,
} from "@/shared/ui/skeletons";

export default function AnalyticsPage() {
    const {
        data: orders,
        isPending: isOrdersPending,
        isError: isOrdersError,
        error: ordersError,
    } = useOrders();
    const {
        data: users,
        isPending: isUsersPending,
        isError: isUsersError,
        error: usersError,
    } = useAllUsers();

    if (isOrdersPending || isUsersPending) {
        return (
            <div className="flex flex-col gap-[15px]">
                <Title title="Статистика магазину" />
                <div className="flex flex-col gap-[15px]">
                    <LineChartSkeleton />
                    <FastStatSkeleton />
                </div>
                <div className="flex md:flex-col gap-[15px]">
                    <PieChartSkeleton />
                    <FastStatMiniSkeleton />
                </div>
                <div className="flex md:flex-col gap-[15px]">
                    <PieChartSkeleton />
                    <FastStatMiniSkeleton />
                </div>
                <div className="flex flex-col gap-[15px]">
                    <LineChartSkeleton />
                    <FastStatSkeleton />
                </div>
            </div>
        );
    }

    if (isOrdersError) {
        return (
            <ErrorWithMessage
                message={
                    (ordersError as any)?.message ||
                    "Не вдалося отримати список замовлень"
                }
            />
        );
    }

    if (isUsersError) {
        return (
            <ErrorWithMessage
                message={
                    (usersError as any)?.message ||
                    "Не вдалося отримати список користувачів"
                }
            />
        );
    }

    if (!orders || !users) {
        return <ErrorWithMessage message="Дані відсутні" />;
    }

    const totalOrders = orders.length;
    const paidOrders = orders.filter(
        (o) => o.status === "paid" || o.status === "delivered"
    );
    const unpaidOrders = orders.filter(
        (o) => o.status !== "paid" && o.status !== "delivered"
    );
    const cancelledOrders = orders.filter((o) => o.status === "cancelled");
    const totalSales = paidOrders.reduce((sum, order) => sum + order.total, 0);
    const avgCheck = paidOrders.length
        ? (totalSales / paidOrders.length).toFixed(2)
        : "0";

    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    const ordersLastWeek = orders.filter(
        (o) =>
            new Date(o.createdAt!) >= weekAgo && new Date(o.createdAt!) <= now
    );

    const conversionRate = totalOrders
        ? ((paidOrders.length / totalOrders) * 100).toFixed(2)
        : "0";

    // Статистика по колекціях
    type CollectionStat = {
        name: string;
        ordersCount: number;
        salesSum: number;
    };
    const collectionMap: Record<string, CollectionStat> = {};
    orders.forEach((order) => {
        order.items.forEach((item) => {
            const collectionName =
                item.product?.category?.collection?.name || "Інше";
            if (!collectionMap[collectionName])
                collectionMap[collectionName] = {
                    name: collectionName,
                    ordersCount: 0,
                    salesSum: 0,
                };
            collectionMap[collectionName].ordersCount += 1;
            collectionMap[collectionName].salesSum += item.product?.price
                ? item.product.price * item.quantity
                : 0;
        });
    });
    const collectionStats = Object.values(collectionMap);
    const totalCollections = collectionStats.length;
    const mostPopularCollection = collectionStats.reduce(
        (prev, curr) => (curr.ordersCount > prev.ordersCount ? curr : prev),
        collectionStats[0] || { ordersCount: 0, name: "" }
    );
    const highestSalesCollection = collectionStats.reduce(
        (prev, curr) => (curr.salesSum > prev.salesSum ? curr : prev),
        collectionStats[0] || { salesSum: 0, name: "" }
    );

    // Статистика по категоріях
    type CategoryStat = { name: string; ordersCount: number; salesSum: number };
    const categoryMap: Record<string, CategoryStat> = {};
    orders.forEach((order) => {
        order.items.forEach((item) => {
            const categoryName = item.product?.category?.name || "Інше";
            if (!categoryMap[categoryName])
                categoryMap[categoryName] = {
                    name: categoryName,
                    ordersCount: 0,
                    salesSum: 0,
                };
            categoryMap[categoryName].ordersCount += 1;
            categoryMap[categoryName].salesSum += item.product?.price
                ? item.product.price * item.quantity
                : 0;
        });
    });
    const categoryStats = Object.values(categoryMap);
    const totalCategories = categoryStats.length;
    const mostPopularCategory = categoryStats.reduce(
        (prev, curr) => (curr.ordersCount > prev.ordersCount ? curr : prev),
        categoryStats[0] || { ordersCount: 0, name: "" }
    );
    const highestSalesCategory = categoryStats.reduce(
        (prev, curr) => (curr.salesSum > prev.salesSum ? curr : prev),
        categoryStats[0] || { salesSum: 0, name: "" }
    );

    // Статистика користувачів
    const totalUsers = users.length;
    const monthAgo = new Date(now);
    monthAgo.setMonth(now.getMonth() - 1);
    const activeUsersLastMonth = users.filter(
        (u) => new Date(u.createdAt) >= monthAgo
    ).length;
    const roleCounts = users.reduce<Record<string, number>>((acc, u) => {
        acc[u.role] = (acc[u.role] || 0) + 1;
        return acc;
    }, {});
    const userIdsWithOrders = new Set(orders.map((o) => o.userId));
    const usersWithOrdersCount = users.filter((u) =>
        userIdsWithOrders.has(u.id)
    ).length;
    const avgOrdersPerUser = usersWithOrdersCount
        ? (totalOrders / usersWithOrdersCount).toFixed(2)
        : "0";

    return (
        <div className="flex flex-col gap-[15px]">
            <Title title={"Статистика магазину"} />
            <div className="flex flex-col gap-[15px]">
                <OrdersAndSalesChart
                    orders={orders}
                    isOrdersError={isOrdersError}
                />
                <OrdersStatsCards
                    totalOrders={totalOrders}
                    paidOrders={paidOrders}
                    unpaidOrders={unpaidOrders}
                    cancelledOrders={cancelledOrders}
                    totalSales={totalSales}
                    avgCheck={avgCheck}
                    ordersLastWeek={ordersLastWeek}
                    conversionRate={conversionRate}
                />
            </div>

            <div className="flex flex-col gap-[15px]">
                <div className="flex lg:flex-col gap-[15px]">
                    <OrdersByCollectionsChart
                        orders={orders}
                        isOrdersError={isOrdersError}
                    />
                    <CollectionsStatsCards
                        totalCollections={totalCollections}
                        mostPopularCollection={mostPopularCollection}
                        highestSalesCollection={highestSalesCollection}
                    />
                </div>
                <div className="flex lg:flex-col gap-[15px]">
                    <OrdersByCategoriesChart
                        orders={orders}
                        isOrdersError={isOrdersError}
                    />
                    <CategoriesStatsCards
                        totalCategories={totalCategories}
                        mostPopularCategory={mostPopularCategory}
                        highestSalesCategory={highestSalesCategory}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-[15px]">
                <UsersRegistrationChart
                    users={users}
                    isUsersError={isUsersError}
                />
                <UsersStatsCards
                    totalUsers={totalUsers}
                    activeUsersLastMonth={activeUsersLastMonth}
                    roleCounts={roleCounts}
                    usersWithOrdersCount={usersWithOrdersCount}
                    avgOrdersPerUser={avgOrdersPerUser}
                />
            </div>
        </div>
    );
}
