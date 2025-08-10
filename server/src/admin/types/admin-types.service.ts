import { ConflictException, Injectable } from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";

@Injectable()
export class AdminTypesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService
    ) {}

    async getTypes() {
        try {
            return await this.prisma.type.findMany();
        } catch (error) {
            console.error("Помилка отримання типів:", error);
            throw error;
        }
    }

    async addType(userId: string, createTypeDto: CreateTypeDto) {
        try {
            const { name } = createTypeDto;

            const existingType = await this.prisma.type.findUnique({
                where: { name },
            });

            if (existingType) {
                throw new ConflictException("Тип з такою назвою вже існує");
            }

            const type = await this.prisma.type.create({
                data: { name },
            });

            await this.adminRecentActions.createAction(userId, `Додано тип ${type.name}`);

            return {
                message: "Тип успішно створено",
                type,
            };
        } catch (error) {
            console.error("Помилка створення типу:", error);
            throw error;
        }
    }

    async editType(userId: string, typeId: string, updateTypeDto: UpdateTypeDto) {
        try {
            const existingType = await this.prisma.type.findUnique({
                where: { name: updateTypeDto.name },
            });

            if (existingType && existingType.id !== typeId) {
                throw new ConflictException("Тип з такою назвою вже існує");
            }

            const updatedType = await this.prisma.type.update({
                where: { id: typeId },
                data: updateTypeDto,
            });

            await this.adminRecentActions.createAction(
                userId,
                `Редаговано тип ${updatedType.name}`
            );

            return {
                message: "Тип успішно оновлено",
                type: updatedType,
            };
        } catch (error) {
            console.error("Помилка редагування типу:", error);
            throw error;
        }
    }

    async deleteType(userId: string, typeId: string) {
        try {
            const type = await this.prisma.type.findUnique({
                where: { id: typeId },
            });

            if (!type) throw new Error("Тип не знайдено");

            await this.prisma.type.delete({
                where: { id: typeId },
            });

            await this.adminRecentActions.createAction(userId, `Видалено тип ${type.name}`);

            return {
                message: "Тип успішно видалено",
            };
        } catch (error) {
            console.error("Помилка видалення типу:", error);
            throw error;
        }
    }
}
