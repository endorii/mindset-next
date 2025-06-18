import { ICartItem } from "../cart/cart.types";
import { IFavoriteItem } from "../favorite/favorite.types";

export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    phone: string;
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
