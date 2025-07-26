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
    | null;

export type OrderModalType =
    | "infoUserOrder"
    | "infoOrder"
    | "editOrder"
    | "addOrder"
    | "deleteOrder"
    | null;

export type TodoModalType = "add" | "edit" | "delete" | null;

export type TStatus = "Активно" | "Не активно";
export type TAvailble = "Доступно" | "Не доступно";

export interface IIconsProps {
    className?: string;
}
