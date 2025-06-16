// types/favorite.ts
import { IProduct } from "../product/product.types";

export interface IFavoriteItem {
    id: string;
    userId: string;
    productId: string;
    product: IProduct;
}
