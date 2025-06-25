import { Role } from "generated/prisma";

export type AuthenticatedRequestUser = {
    id: string;
    name: string;
    role: Role;
};
