import {
    BadRequestException,
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
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
            const colors = await this.prisma.color.findMany();
            return colors;
        } catch (error) {
            console.error("Помилка отримання кольорів:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося отримати кольори");
        }
    }

    async addColor(userId: string, createColorDto: CreateColorDto) {
        try {
            const existingColor = await this.prisma.color.findUnique({
                where: {
                    name: createColorDto.name,
                },
            });

            const existingHex = await this.prisma.color.findUnique({
                where: {
                    hexCode: createColorDto.hexCode,
                },
            });

            if (existingColor) {
                throw new ConflictException("Колір з такою назвою вже існує");
            }

            if (existingHex) {
                throw new ConflictException("HEX-код з такою назвою вже існує");
            }

            const color = await this.prisma.color.create({
                data: createColorDto,
            });

            await this.adminRecentActions.createAction(userId, `Додано колір ${color.name}`);

            return {
                message: "Колір успішно створено",
                color,
            };
        } catch (error) {
            console.error("Помилка створення кольору:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Сталася внутрішня помилка сервера");
        }
    }

    async editColor(userId: string, colorId: string, updateColorDto: UpdateColorDto) {
        if (!updateColorDto || Object.keys(updateColorDto).length === 0) {
            throw new BadRequestException("Дані для оновлення не надано");
        }

        try {
            const color = await this.prisma.color.findUnique({
                where: { id: colorId },
            });

            if (!color) {
                throw new NotFoundException("Кольору з таким ID не знайдено");
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
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Сталася внутрішня помилка сервера");
        }
    }

    async deleteColor(userId: string, colorId: string) {
        try {
            const color = await this.prisma.color.findUnique({
                where: { id: colorId },
            });

            if (!color) {
                throw new NotFoundException("Кольору з таким ID не знайдено");
            }

            await this.prisma.color.delete({
                where: { id: colorId },
            });

            await this.adminRecentActions.createAction(userId, `Видалено колір ${color.name}`);

            return {
                message: "Колір успішно видалено",
            };
        } catch (error) {
            console.error("Помилка видалення кольору:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Сталася внутрішня помилка сервера");
        }
    }
}
