import { IProduct } from "../product/product.types";

export interface ICartItem {
    productId: string;
    quantity: number;
    size: string;
    color: string;
    type: string;
    product: IProduct;
}
