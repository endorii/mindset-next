import { Role } from "generated/prisma";

export interface AuthenticatedRequestUser {
    id: string;
    email: string;
    role: Role;
}
