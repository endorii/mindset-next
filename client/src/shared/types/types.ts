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
    | "addUserAddress"
    | "editUserAddress"
    | "editUserInfo"
    | "editUserPassword"
    | "changePassword"
    | "deleteAccount"
    | null;

export type OrderModalType =
    | "infoUserOrder"
    | "infoOrder"
    | "editOrder"
    | "addOrder"
    | "deleteOrder"
    | null;

export type ReviewModalType =
    | "reviewInfo"
    | "reviewReply"
    | "reviewApprove"
    | "reviewDelete"
    | null;

export type TodoModalType = "add" | "edit" | "delete" | null;

export type TStatus = "Active" | "Not active";
export type TAvailble = "Available" | "Not available";

export interface IIconsProps {
    className?: string;
}

export type BannerEntity = "collection" | "category" | "product";
export type ImagesEntity = "products" | "reviews";
