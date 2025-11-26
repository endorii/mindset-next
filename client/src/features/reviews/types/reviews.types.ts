import { IOrderItem } from "@/features/orders/types/orders.types";
import { IProduct } from "@/features/products/types/products.types";

export interface IReview {
    id?: string;
    rating: string;
    content: string;
    senderName: string;
    senderEmail: string;
    userId?: string;
    productId: string;
    product?: IProduct;
    orderItemId: string;
    orderItem?: IOrderItem;
    createdAt?: string;
    updatedAt?: string;
    isApproved?: boolean;
    isHelpful?: number;
    isNotHelpful?: number;
    images?: string[];
    adminReply?: string;
    adminReplyAt?: string;

    reviewVotes?: { userId: string; isHelpful: boolean }[];
}
