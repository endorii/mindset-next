import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRecentActionDto } from "./dto/create-recent-action.dto";

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
            console.error("Error creating action:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to create action");
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
            console.error("Error fetching actions:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to fetch user actions");
        }
    }
}
