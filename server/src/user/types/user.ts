import { Role } from "../enum/role.enum";

export type AppUser = {
    email: string;
    password: string;
    id: string;
    username: string;
    phone: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
};
