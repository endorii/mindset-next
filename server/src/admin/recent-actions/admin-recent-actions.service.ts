import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRecentActionDto } from "./dto/create-recent-action.dto";

@Injectable()
export class AdminRecentActionsService {
    constructor(private readonly prisma: PrismaService) {}

    async createAction(userId: string, action: CreateRecentActionDto["action"]) {
        const newAction = await this.prisma.recentAction.create({
            data: {
                userId,
                action,
            },
        });
        return newAction;
    }

    async getActionsFromUser(userId: string) {
        const actions = await this.prisma.recentAction.findMany({
            where: {
                userId,
            },
        });
        return actions;
    }
}
