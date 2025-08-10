import { ConflictException, Injectable } from "@nestjs/common";
import { CreateColorDto } from "./dto/create-color.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateColorDto } from "./dto/update-color.dto";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";

@Injectable()
export class AdminColorsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService
    ) {}

    async getColors() {
        try {
            return await this.prisma.color.findMany();
        } catch (error) {
            console.error("Помилка отримання кольорів:", error);
            throw error;
        }
    }

    async addColor(userId: string, createColorDto: CreateColorDto) {
        try {
            const { name, hexCode } = createColorDto;

            const existingColor = await this.prisma.color.findUnique({
                where: { name },
            });

            if (existingColor) {
                throw new ConflictException("Колір з такою назвою вже існує");
            }

            const color = await this.prisma.color.create({
                data: { name, hexCode },
            });

            await this.adminRecentActions.createAction(userId, `Додано колір ${color.name}`);

            return {
                message: "Колір успішно створено",
                color,
            };
        } catch (error) {
            console.error("Помилка створення кольору:", error);
            throw error;
        }
    }

    async editColor(userId: string, colorId: string, updateColorDto: UpdateColorDto) {
        try {
            const existingColor = await this.prisma.color.findUnique({
                where: { name: updateColorDto.name },
            });

            if (existingColor && existingColor.id !== colorId) {
                throw new ConflictException("Колір з такою назвою вже існує");
            }

            const updatedColor = await this.prisma.color.update({
                where: { id: colorId },
                data: updateColorDto,
            });

            await this.adminRecentActions.createAction(
                userId,
                `Редаговано колір ${updatedColor.name}`
            );

            return {
                message: "Колір успішно оновлено",
                color: updatedColor,
            };
        } catch (error) {
            console.error("Помилка редагування кольору:", error);
            throw error;
        }
    }

    async deleteColor(userId: string, colorId: string) {
        try {
            const color = await this.prisma.color.findUnique({
                where: { id: colorId },
            });

            if (!color) throw new Error("Колір не знайдено");

            await this.prisma.color.delete({
                where: { id: colorId },
            });

            await this.adminRecentActions.createAction(userId, `Видалено колір ${color.name}`);

            return {
                message: "Колір успішно видалено",
            };
        } catch (error) {
            console.error("Помилка видалення кольору:", error);
            throw error;
        }
    }
}
