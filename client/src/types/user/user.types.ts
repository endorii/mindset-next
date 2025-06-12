import { ICartItem, IFavoriteItem } from "../types";

export interface IUser {
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
}
