import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
    HttpException,
    NotFoundException,
} from "@nestjs/common";
import { CreateSizeDto } from "./dto/create-size.dto";
import { UpdateSizeDto } from "./dto/update-size.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";

@Injectable()
export class AdminSizesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService
    ) {}

    async getSizes() {
        try {
            const sizes = await this.prisma.size.findMany();

            return sizes;
        } catch (error: unknown) {
            console.error("Помилка отримання розмірів:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося отримати розміри");
        }
    }

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

            await this.adminRecentActions.createAction(userId, `Додано розмір ${size.name}`);

            return {
                message: "Розмір успішно створено",
                size,
            };
        } catch (error: unknown) {
            console.error("Помилка створення розміру:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося створити розмір");
        }
    }

    async editSize(userId: string, sizeId: string, updateSizeDto: UpdateSizeDto) {
        try {
            const size = await this.prisma.size.findUnique({
                where: { id: sizeId },
            });

            if (!size) {
                throw new NotFoundException("Розміру з таким ID не знайдено");
            }
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

            await this.adminRecentActions.createAction(
                userId,
                `Редаговано розмір ${updatedSize.name}`
            );

            return {
                message: "Розмір успішно оновлено",
                size: updatedSize,
            };
        } catch (error: unknown) {
            console.error("Помилка редагування розміру:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося оновити розмір");
        }
    }

    async deleteSize(userId: string, sizeId: string) {
        try {
            const size = await this.prisma.size.findUnique({
                where: { id: sizeId },
            });

            if (!size) {
                throw new NotFoundException("Розміру з таким ID не знайдено");
            }

            await this.prisma.size.delete({
                where: { id: sizeId },
            });

            await this.adminRecentActions.createAction(userId, `Видалено розмір ${size.name}`);

            return {
                message: "Розмір видалено",
            };
        } catch (error: unknown) {
            console.error("Помилка видалення розміру:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося видалити розмір");
        }
    }
}
