import { ICollection } from "../collection/collection.types";
import { IProduct } from "../product/product.types";
import { TStatus } from "../types";

export interface ICategory {
    id: string;
    name: string;
    path: string;
    banner: string;
    views: number;
    status: TStatus;
    products: IProduct[];
    collection?: ICollection;
    collectionId: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICategoryPayload {
    name: string;
    path: string;
    banner: string;
    views: number;
    status: TStatus;
    products?: IProduct[];
    collection?: ICollection;
    collectionId: string;
}
