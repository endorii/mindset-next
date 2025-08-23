import { PaymentMethodType, PaymentStatus } from "@/features/checkout/types/checkout.types";
import { IProduct } from "@/features/products/types/products.types";

export interface INovaPostDataObj {
    Description: string;
    Ref: string;
}

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

export interface IOrder {
    id?: string;
    fullName: string;
    phoneNumber: string;
    email?: string;
    area: string;
    city: string;
    postDepartment: string;
    additionalInfo?: string;
    total: number;
    createdAt?: string;
    updatedAt?: string;
    items: IOrderItem[];
    status: OrderStatus;
    paymentMethod: PaymentMethodType;
    paymentStatus?: PaymentStatus;
    userId?: string;
}
export interface IOrderItem {
    id?: string;
    orderId?: string;
    productId: string;
    quantity: number;
    color: string;
    size: string;
    type: string;
    product?: IProduct;
}
