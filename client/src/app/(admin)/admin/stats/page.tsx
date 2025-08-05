"use client";

import { useUsers } from "@/features/admin/hooks/useUsers";
import { useOrders } from "@/features/orders/hooks/useOrders";
import StatCard from "@/shared/components/cards/StatCard";
import {
    OrdersAndSalesChart,
    OrdersByCollectionsChart,
    OrdersByCategoriesChart,
} from "@/shared/components/charts";
import UsersRegistrationChart from "@/shared/components/charts/UsersRegistrationsChart";

export default function AnalyticsPage() {
    const { data: orders } = useOrders();
    const { data: users } = useUsers();

    if (!orders) return null;
    if (!users) return null;

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

            if (!collectionMap[collectionName]) {
                collectionMap[collectionName] = {
                    name: collectionName,
                    ordersCount: 0,
                    salesSum: 0,
                };
            }

            collectionMap[collectionName].ordersCount += 1;
            collectionMap[collectionName].salesSum += item.product?.price
                ? item.product.price * item.quantity
                : 0;
        });
    });

    const collectionStats = Object.values(collectionMap);
    const totalCollections = collectionStats.length;
    const mostPopularCollection =
        collectionStats.reduce(
            (prev, curr) => (curr.ordersCount > prev.ordersCount ? curr : prev),
            collectionStats[0] || { ordersCount: 0, name: "" }
        ) || null;
    const highestSalesCollection =
        collectionStats.reduce(
            (prev, curr) => (curr.salesSum > prev.salesSum ? curr : prev),
            collectionStats[0] || { salesSum: 0, name: "" }
        ) || null;

    type CategoryStat = {
        name: string;
        ordersCount: number;
        salesSum: number;
    };

    const categoryMap: Record<string, CategoryStat> = {};

    orders.forEach((order) => {
        order.items.forEach((item) => {
            const categoryName = item.product?.category?.name || "Інше";

            if (!categoryMap[categoryName]) {
                categoryMap[categoryName] = {
                    name: categoryName,
                    ordersCount: 0,
                    salesSum: 0,
                };
            }

            categoryMap[categoryName].ordersCount += 1;
            categoryMap[categoryName].salesSum += item.product?.price
                ? item.product.price * item.quantity
                : 0;
        });
    });

    const categoryStats = Object.values(categoryMap);
    const totalCategories = categoryStats.length;
    const mostPopularCategory =
        categoryStats.reduce(
            (prev, curr) => (curr.ordersCount > prev.ordersCount ? curr : prev),
            categoryStats[0] || { ordersCount: 0, name: "" }
        ) || null;
    const highestSalesCategory =
        categoryStats.reduce(
            (prev, curr) => (curr.salesSum > prev.salesSum ? curr : prev),
            categoryStats[0] || { salesSum: 0, name: "" }
        ) || null;

    const totalUsers = users.length;

    const monthAgo = new Date(now);
    monthAgo.setMonth(now.getMonth() - 1);
    const activeUsersLastMonth = users.filter(
        (user) => new Date(user.createdAt) >= monthAgo
    ).length;

    const roleCounts = users.reduce<Record<string, number>>((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
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
        <div className="flex flex-col gap-[20px]">
            <h1 className="text-3xl font-semibold">
                Аналітика та статистика магазину
            </h1>

            <div className="flex flex-col gap-[10px]">
                <h2 className="text-xl font-semibold">
                    Статистика замовлень та продажів
                </h2>
                <OrdersAndSalesChart orders={orders} />

                <div className="grid grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 xxs:grid-cols-1 gap-[20px]">
                    <StatCard
                        title="Загальна кількість замовлень"
                        value={totalOrders}
                    />
                    <StatCard
                        title="Успішні замовлення"
                        value={paidOrders.length}
                    />
                    <StatCard
                        title="Незакінчені замовлення"
                        value={unpaidOrders.length}
                    />
                    <StatCard
                        title="Відмінені замовлення"
                        value={cancelledOrders.length}
                    />
                    <StatCard
                        title="Сума продажів"
                        value={totalSales.toFixed(2) + " ₴"}
                    />
                    <StatCard title="Середній чек" value={avgCheck + " ₴"} />
                    <StatCard
                        title="Замовлення за останній тиждень"
                        value={ordersLastWeek.length}
                    />
                    <StatCard
                        title="Конверсія замовлень"
                        value={conversionRate + " %"}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-[40px]">
                <div className="flex flex-col gap-[10px]">
                    <h2 className="text-xl font-semibold">
                        Продажі за колекціями
                    </h2>
                    <div className="flex lg:flex-col gap-[20px]">
                        <OrdersByCollectionsChart orders={orders} />
                        <div className="w-1/3 lg:w-full grid grid-cols-2 xxs:grid-cols-1 gap-[20px]">
                            <StatCard
                                title="Кількість колекцій"
                                value={totalCollections}
                            />
                            <StatCard
                                title="Найпопулярніша колекція"
                                value={mostPopularCollection?.name || "-"}
                            />
                            <StatCard
                                title="Колекція з найбільшим обсягом продажів"
                                value={
                                    highestSalesCollection
                                        ? `${
                                              highestSalesCollection.name
                                          } (${highestSalesCollection.salesSum.toFixed(
                                              2
                                          )} ₴)`
                                        : "-"
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                    <h2 className="text-xl font-semibold">
                        Продажі за категоріями
                    </h2>
                    <div className="flex lg:flex-col gap-[20px]">
                        <OrdersByCategoriesChart orders={orders} />
                        <div className="w-1/3 lg:w-full grid grid-cols-2 xxs:grid-cols-1 gap-[20px]">
                            <StatCard
                                title="Кількість категорій"
                                value={totalCategories}
                            />
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
                                          } (${highestSalesCategory.salesSum.toFixed(
                                              2
                                          )} ₴)`
                                        : "-"
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-[10px]">
                <h2 className="text-xl font-semibold">
                    Статистика користувачів
                </h2>
                <UsersRegistrationChart users={users} />
                <div className="grid grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 xxs:grid-cols-1 gap-[20px]">
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
            </div>
        </div>
    );
}
