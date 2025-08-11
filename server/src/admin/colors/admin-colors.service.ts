import {
    ConflictException,
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
            return await this.prisma.color.findMany();
        } catch (error) {
            console.error("Помилка отримання кольорів:", error);
            throw new InternalServerErrorException("Не вдалося отримати кольори");
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

            return color;
        } catch (error) {
            console.error("Помилка створення кольору:", error);
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося створити колір");
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
        } catch (error) {
            console.error("Помилка редагування кольору:", error);
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося оновити колір");
        }
    }

    async deleteColor(userId: string, colorId: string) {
        try {
            const color = await this.prisma.color.findUnique({
                where: { id: colorId },
            });

            if (!color) throw new NotFoundException("Колір не знайдено");

            await this.prisma.color.delete({
                where: { id: colorId },
            });

            await this.adminRecentActions.createAction(userId, `Видалено колір ${color.name}`);
        } catch (error) {
            console.error("Помилка видалення кольору:", error);
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося видалити колір");
        }
    }
}
