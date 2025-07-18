import { IProduct } from "@/features/products/types/products.types";

export interface ICartItem {
    id: string;
    price: number;
    productId: string;
    quantity: number;
    size: string;
    color: string;
    type: string;
    product: IProduct;
}
