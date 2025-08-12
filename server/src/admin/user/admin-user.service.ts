import { Injectable, InternalServerErrorException, HttpException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AdminUserService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllUsers() {
        try {
            const users = await this.prisma.user.findMany();
            return users;
        } catch (error: unknown) {
            console.error("Помилка отримання користувачів:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося отримати користувачів");
        }
    }
}
