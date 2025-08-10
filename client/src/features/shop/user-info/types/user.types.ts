import { ICartItem } from "@/features/shop/cart/types/cart.types";
import { IFavoriteItem } from "@/features/shop/favorites/types/favorites.types";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: "ADMIN" | "USER";
    shippingAddress: IUserShippingAdress;
    cart: ICartItem[];
    favorites: IFavoriteItem[];
    createdAt: string;
    updatedAt: string;
}

export interface IUserShippingAdress {
    recipient: string;
    country: string;
    region: string;
    city: string;
    postalCode: string;
    street: string;
    building: string;
    apartment: string;
    userId: IUser["id"];
}
