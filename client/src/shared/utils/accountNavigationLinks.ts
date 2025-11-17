import { CartIcon, CollectionsIcon, HeartIcon, InfoIcon, MainPageIcon } from "../icons";

export const accountNavigationLinks = [
    {
        href: "/",
        Icon: MainPageIcon,
        text: "Home",
        className: "w-[32px] fill-white group-hover:fill-black",
    },
    {
        href: "/account",
        Icon: InfoIcon,
        text: "Info",
        className: "w-[32px] fill-none stroke-[1.5] stroke-white group-hover:stroke-black",
    },

    {
        href: "/account/orders",
        Icon: CollectionsIcon,
        text: "Orders",
        className: "w-[32px] fill-white group-hover:fill-black",
    },
    {
        href: "/cart",
        Icon: CartIcon,
        text: "Cart",
        className: "w-[32px] stroke-white fill-none group-hover:stroke-black",
    },
    {
        href: "/favorites",
        Icon: HeartIcon,
        text: "Favorites",
        className: "w-[32px] stroke-white fill-none group-hover:stroke-black",
    },
];
