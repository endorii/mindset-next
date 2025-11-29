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

export type BannerEntity = "collection" | "category" | "product";
export type ImagesEntity = "products" | "reviews";

export type Period = "day" | "week" | "month" | "year";
