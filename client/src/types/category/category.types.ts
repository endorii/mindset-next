import { ICollection } from "../collection/collection.types";
import { IProduct } from "../product/product.types";
import { TStatus } from "../types";

export interface ICategory {
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
