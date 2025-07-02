import { IProduct } from "@/features/products/types/products.types";

export interface IFavoriteItem {
    size: string;
    type: string;
    color: string;
    productId: string;
    product: IProduct;
}

export interface ILocalFavoriteItem {
    size: string;
    type: string;
    color: string;
    productId: string;
    product: IProduct;
}
