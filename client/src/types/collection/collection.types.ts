import { ICategory } from "../category/category.types";
import { TStatus } from "../types";

export interface ICollection {
    name: string;
    path: string;
    banner: string;
    views: number;
    status: TStatus;
    categories: ICategory[];
    createdAt: string;
    updatedAt: string;
}
