import { IProduct } from "@/features/products/types/products.types";

export interface IFavoriteItem {
    productId: string;
    product: IProduct;
}

export interface ILocalFavoriteItem {
    productId: string;
    product: IProduct;
}
