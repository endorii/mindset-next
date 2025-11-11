import {
    AccountIcon,
    CollectionsIcon,
    MainPageIcon,
    OrderIcon,
    ReviewIcon,
    StatsIcon,
    TagIcon,
} from "@/shared/icons";

export const adminPanelNavigationLinks = [
    { href: "/admin", Icon: MainPageIcon, text: "Головна" },
    {
        href: "/admin/stats",
        Icon: StatsIcon,
        text: "Статистика",
    },
    {
        href: "/admin/collections",
        Icon: CollectionsIcon,
        text: "Колекції",
    },
    {
        href: "/admin/attributes",
        Icon: TagIcon,
        text: "Атрибути",
    },
    {
        href: "/admin/orders",
        Icon: OrderIcon,
        text: "Замовлення",
    },
    {
        href: "/admin/reviews",
        Icon: ReviewIcon,
        text: "Відгуки",
    },
    {
        href: "/admin/account",
        Icon: AccountIcon,
        text: "Акаунт",
    },
];
