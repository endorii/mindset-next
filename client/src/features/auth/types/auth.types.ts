export interface IAuthenticatedUser {
    id: string;
    userName: string;
    role: string;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface CreateUserDto {
    userName: string;
    email: string;
    phone?: string;
    password: string;
    rules: boolean;
    offers: boolean;
    isVerified: boolean;
}

export interface IAuthResponse {
    id: string;
    userName: string;
    phone: string;
    email: string;
    role: string;
}
