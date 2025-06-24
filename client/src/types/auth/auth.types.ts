import { IUser } from "../user/user.types";

export interface IRegisterData {
    username: string;
    email: string;
    phone: string;
    password: string;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IAuthResponse {
    statusCode: number;
    message: string;
    user: IUser;
}

export interface IUserData {
    id: string;
    email: string;
    username?: string;
    phone?: string;
}
