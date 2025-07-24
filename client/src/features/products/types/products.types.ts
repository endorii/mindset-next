import { IColor } from "@/features/admin/attributes/product-colors/types/product-color.types";
import { ISize } from "@/features/admin/attributes/product-sizes/types/product-size.types";
import { IType } from "@/features/admin/attributes/product-types/types/product-type.types";
import { ICategory } from "@/features/categories/types/categories.types";
import { TStatus } from "@/shared/types/types";

export interface IProduct {
    id: string;
    name: string;
    price: number;
    oldPrice: number;
    path: string;
    views: number;
    banner: string;
    status: TStatus;
    images: string[];
    available: boolean;
    description: string;
    composition: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;

    productColors: IProductToColor[];
    productTypes: IProductToType[];
    productSizes: IProductToSize[];

    category?: ICategory;
}

export interface ICreateProductPayload {
    name: string;
    path: string;
    price: number;
    oldPrice: number;
    available: boolean;
    description: string;
    composition: string;
    categoryId?: string;
    status: TStatus;
    views: number;
    banner: string;
    images: string[];

    colorIds?: string[];
    sizeIds?: string[];
    typeIds?: string[];
}

export interface IProductToColor {
    colorId: string;
    productId: string;
    color: IColor;
    product: IProduct;
}

export interface IProductToType {
    typeId: string;
    productId: string;
    type: IType;
    product: IProduct;
}

export interface IProductToSize {
    sizeId: string;
    productId: string;
    size: ISize;
    product: IProduct;
}
