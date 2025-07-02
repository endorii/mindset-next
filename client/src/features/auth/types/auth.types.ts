export interface IAuthenticatedUser {
    id: string;
    name: string;
    role: string;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface CreateUserDto {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface IAuthResponse {
    id: string;
    name: string;
    phone: string;
    email: string;
    role: string;
}
