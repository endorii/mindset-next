import { Injectable } from "@nestjs/common";
import { CreateRecentActionDto } from "./dto/create-recent-action.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RecentActionsService {
    constructor(private readonly prisma: PrismaService) {}

    async createAction(userId: string, action: CreateRecentActionDto["action"]) {
        await this.prisma.recentAction.create({
            data: {
                userId,
                action,
            },
        });
    }

    async getActionsFromUser(userId: string) {
        return await this.prisma.recentAction.findMany({
            where: {
                userId,
            },
        });
    }

    // remove(id: number) {
    //     return `This action removes a #${id} recentAction`;
    // }
}
