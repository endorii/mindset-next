import { ICategory } from "@/features/categories/types/categories.types";

export interface ICollection {
    id?: string;
    name: string;
    path: string;
    description: string;
    banner?: string | null;
    isVisible: boolean;
    categories?: ICategory[];
    createdAt?: string;
    updatedAt?: string;
}
