import { IProduct } from "../product/product.types";

export interface ICartItem {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    size: string;
    color: string;
    product: IProduct;
}
