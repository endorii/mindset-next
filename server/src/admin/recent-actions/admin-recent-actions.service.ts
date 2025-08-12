import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateRecentActionDto } from "./dto/create-recent-action.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AdminRecentActionsService {
    constructor(private readonly prisma: PrismaService) {}

    async createAction(userId: string, action: CreateRecentActionDto["action"]) {
        try {
            const newAction = await this.prisma.recentAction.create({
                data: {
                    userId,
                    action,
                },
            });
            return newAction;
        } catch (error) {
            console.error("Помилка створення дії:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося створити дію");
        }
    }

    async getActionsFromUser(userId: string) {
        try {
            const actions = await this.prisma.recentAction.findMany({
                where: {
                    userId,
                },
            });
            return actions;
        } catch (error) {
            console.error("Помилка отримання дій:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося отримати дії користувача");
        }
    }
}
