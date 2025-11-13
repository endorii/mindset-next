import { IProduct } from "@/features/products/types/products.types";

export interface ICartItem {
    id: string;
    productId: string;
    quantity: number;
    size: string;
    color: string;
    type: string;
    product?: IProduct;
}
