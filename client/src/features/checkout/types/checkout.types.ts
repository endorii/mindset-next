export interface INovaPostDataObj {
    Description: string;
    Ref: string;
}

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "canceled";

export interface IOrder {
    fullName: string;
    phoneNumber: string;
    email?: string;
    area: string;
    city: string;
    postDepartment: string;
    additionalInfo?: string;
    total: number;
    items: IOrderItem[];
    status: OrderStatus;
    userId: string;
}
export interface IOrderItem {
    orderId?: string;
    productId: string;
    quantity: number;
    color: string;
    size: string;
    type: string;
}
