import { IUser } from "../user-info/types/user.types";

export interface IRecentActions {
    id: string;
    action: string;
    timestamp: string;
    userId: IUser["id"];
}
