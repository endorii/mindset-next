import { ICollection } from "@/features/collections/types/collections.types";
import { IProduct } from "@/features/products/types/products.types";

export interface ICategory {
    id?: string;
    name: string;
    path: string;
    description: string;
    banner: string;
    isVisible: boolean;
    products?: IProduct[];
    collection?: ICollection;
    collectionId: string;
    createdAt?: string;
    updatedAt?: string;
}
