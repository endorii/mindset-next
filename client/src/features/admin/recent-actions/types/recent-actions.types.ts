import { IUser } from "../../../shop/user-info/types/user.types";

export interface IRecentActions {
    id: string;
    action: string;
    createdAt: string;
    userId: IUser["id"];
}
