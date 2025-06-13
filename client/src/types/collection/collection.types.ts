import { ICategory } from "../category/category.types";
import { TStatus } from "../types";

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
