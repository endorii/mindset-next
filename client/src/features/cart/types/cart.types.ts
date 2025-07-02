import { IProduct } from "@/features/products/types/products.types";

export interface ICartItem {
    productId: string;
    quantity: number;
    size: string;
    color: string;
    type: string;
    product: IProduct;
}
