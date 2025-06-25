import { Role } from "generated/prisma";

export type AuthenticatedUser = {
    id: number;
    role: Role;
    name: string;
    email: string;
};
