import { Role } from "generated/prisma";

export type AuthenticatedUser = {
    id: string;
    role: Role;
    name: string;
    email: string;
};
