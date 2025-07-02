import { ICategory } from "@/features/categories/types/categories.types";
import { TStatus } from "@/shared/types/types";

export interface ICollection {
    id: string;
    name: string;
    path: string;
    banner: string;
    views: number;
    status: TStatus;
    categories: ICategory[];
    createdAt: string;
    updatedAt: string;
}

export interface ICollectionPayload {
    name: string;
    path: string;
    banner: string;
    views: number;
    status: TStatus;
    categories?: ICategory[];
}
