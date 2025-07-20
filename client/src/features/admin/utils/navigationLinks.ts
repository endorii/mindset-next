import {
    AccountIcon,
    CollectionsIcon,
    MainPageIcon,
    SettingsIcon,
    StatsIcon,
    TagIcon,
} from "@/shared/icons";
import OrderIcon from "@/shared/icons/OrderIcon";

export const adminPanelNavigationLinks = [
    { href: "/admin", Icon: MainPageIcon, text: "Головна" },
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
        href: "/admin/stats",
        Icon: StatsIcon,
        text: "Статистика",
    },
    {
        href: "/admin/account",
        Icon: AccountIcon,
        text: "Акаунт",
    },
];
