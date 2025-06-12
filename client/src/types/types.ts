import { IProduct } from "./product/product.types";

export interface Props {
    children: React.ReactNode;
}

export type ModalType = "add" | "edit" | "delete" | "info" | null;
export type AttributeModalType =
    | "addColor"
    | "editColor"
    | "deleteColor"
    | "infoColor"
    | "addType"
    | "editType"
    | "deleteType"
    | "infoType"
    | "addSize"
    | "editSize"
    | "deleteSize"
    | "infoSize"
    | null;

export type TStatus = "ACTIVE" | "INACTIVE";

export interface ICartItem {
    productPath: IProduct["path"];
}

export interface IFavoriteItem {
    productPath: IProduct["path"];
}

export interface IIconsProps {
    className?: string;
}
