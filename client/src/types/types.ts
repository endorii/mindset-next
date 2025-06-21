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

export type TStatus = "ACTIVE" | "INACTIVE";

export interface IIconsProps {
    className?: string;
}
