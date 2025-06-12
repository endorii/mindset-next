import { ICategory } from "../category/category.types";
import { IColor } from "../color/color.types";
import { ISize } from "../size/size.types";
import { IType } from "../type/type.types";
import { TStatus } from "../types";

export interface IProduct {
    name: string;
    price: number;
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

    // cartItems?: ICartItem[];
    // favorites?: IFavoriteItem[];
}
export interface ICreateProductPayload {
    name: string;
    path: string;
    price: number;
    available: boolean;
    description: string;
    composition: string;
    categoryId: string;
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
