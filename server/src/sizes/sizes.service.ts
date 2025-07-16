import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateSizeDto } from "./dto/create-size.dto";
import { UpdateSizeDto } from "./dto/update-size.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { RecentActionsService } from "src/recent-actions/recent-actions.service";

@Injectable()
export class SizesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly recentActions: RecentActionsService
    ) {}

    async addSize(userId: string, createSizeDto: CreateSizeDto) {
        try {
            const { name } = createSizeDto;

            const existingSize = await this.prisma.size.findUnique({
                where: { name },
            });

            if (existingSize) {
                throw new ConflictException("Розмір з такою назвою вже існує");
            }

            const size = await this.prisma.size.create({
                data: { name },
            });

            await this.recentActions.createAction(userId, `Додано розмір ${size.name}`);

            return {
                message: "Розмір успішно створено",
                size,
            };
        } catch (error) {
            console.error("Помилка створення розміру:", error);
            throw error;
            ("Не вдалося створити розмір");
        }
    }

    async getSizes() {
        try {
            return await this.prisma.size.findMany();
        } catch (error) {
            console.error("Помилка отримання розмірів:", error);
            throw error;
            ("Не вдалося отримати розміри");
        }
    }

    async editSize(userId: string, sizeId: string, updateSizeDto: UpdateSizeDto) {
        try {
            const existingSize = await this.prisma.size.findUnique({
                where: { name: updateSizeDto.name },
            });

            if (existingSize && existingSize.id !== sizeId) {
                throw new ConflictException("Розмір з такою назвою вже існує");
            }

            const updatedSize = await this.prisma.size.update({
                where: { id: sizeId },
                data: updateSizeDto,
            });

            await this.recentActions.createAction(userId, `Редаговано розмір ${updatedSize.name}`);

            return {
                message: "Розмір успішно оновлено",
                size: updatedSize,
            };
        } catch (error) {
            console.error("Помилка редагування розміру:", error);
            throw error;
            ("Не вдалося оновити розмір");
        }
    }

    async deleteSize(userId: string, sizeId: string) {
        try {
            const size = await this.prisma.size.findUnique({
                where: { id: sizeId },
            });

            if (!size) throw new Error("Розмір не знайдено");

            await this.prisma.size.delete({
                where: { id: sizeId },
            });

            await this.recentActions.createAction(userId, `Видалено розмір ${size.name}`);

            return {
                message: "Розмір успішно видалено",
            };
        } catch (error) {
            console.error("Помилка видалення розміру:", error);
            throw error;
            ("Не вдалося видалити розмір");
        }
    }
}
