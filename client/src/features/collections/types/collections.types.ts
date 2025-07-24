import { ICategory } from "@/features/categories/types/categories.types";
import { TStatus } from "@/shared/types/types";

export interface ICollection {
    id?: string;
    name: string;
    path: string;
    description: string;
    banner: string;
    views: number;
    status: TStatus;
    categories?: ICategory[];
    createdAt?: string;
    updatedAt?: string;
}
