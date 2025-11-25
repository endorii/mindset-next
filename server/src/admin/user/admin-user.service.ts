import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AdminUserService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllUsers() {
        const users = await this.prisma.user.findMany();
        return users;
    }
}
