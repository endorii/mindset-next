export interface INovaPostDataObj {
    Description: string;
    Ref: string;
}

export interface IOrderItem {
    id: string;
    orderId: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    color: string;
    size: string;
    type: string;
}

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "canceled";

export interface IOrder {
    id: string;
    fullName: string;
    phoneNumber: string;
    area: string;
    city: string;
    postDepartment: string;
    additionalInfo?: string;
    status: "pending" | "shipped" | "delivered" | "cancelled";
    createdAt?: Date;
    userId?: string;
    total: number;
    items: IOrderItem[];
}
