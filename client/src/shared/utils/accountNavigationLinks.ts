import { MainPageIcon, InfoIcon, CollectionsIcon, CartIcon, HeartIcon } from "../icons";

export const accountNavigationLinks = [
    {
        href: "/",
        Icon: MainPageIcon,
        text: "На головну",
        className: "w-[32px] fill-white group-hover:fill-black",
    },
    {
        href: "/account",
        Icon: InfoIcon,
        text: "Інформація",
        className: "w-[32px] fill-none stroke-[1.5] stroke-white group-hover:stroke-black",
    },

    {
        href: "/account/orders",
        Icon: CollectionsIcon,
        text: "Замовлення",
        className: "w-[32px] fill-white group-hover:fill-black",
    },
    {
        href: "/cart",
        Icon: CartIcon,
        text: "Кошик",
        className: "w-[32px] stroke-white fill-none group-hover:stroke-black",
    },
    {
        href: "/favorites",
        Icon: HeartIcon,
        text: "Улюблене",
        className: "w-[32px] stroke-white fill-none group-hover:stroke-black",
    },
];
