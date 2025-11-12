import { ICollection } from "@/features/collections/types/collections.types";
import { IProduct } from "@/features/products/types/products.types";
import { TStatus } from "@/shared/types/types";

export interface ICategory {
    id?: string;
    name: string;
    path: string;
    description: string;
    banner: string;
    views: number;
    status: TStatus;
    products?: IProduct[];
    collection?: ICollection;
    collectionId: string;
    createdAt?: string;
    updatedAt?: string;
}
