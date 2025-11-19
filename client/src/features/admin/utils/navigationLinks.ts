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
    { href: "/admin", Icon: MainPageIcon, text: "Main" },
    {
        href: "/admin/stats",
        Icon: StatsIcon,
        text: "Statistics",
    },
    {
        href: "/admin/collections",
        Icon: CollectionsIcon,
        text: "Collections",
    },
    {
        href: "/admin/attributes",
        Icon: TagIcon,
        text: "Attributes",
    },
    {
        href: "/admin/orders",
        Icon: OrderIcon,
        text: "Orders",
    },
    {
        href: "/admin/reviews",
        Icon: ReviewIcon,
        text: "Reviews",
    },
    {
        href: "/admin/account",
        Icon: AccountIcon,
        text: "Account",
    },
];
