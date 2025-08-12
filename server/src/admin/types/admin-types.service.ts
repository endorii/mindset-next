import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    HttpException,
    NotFoundException,
} from "@nestjs/common";
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
            const types = await this.prisma.type.findMany();

            return types;
        } catch (error: unknown) {
            console.error("Помилка отримання типів:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося отримати типи");
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
        } catch (error: unknown) {
            console.error("Помилка створення типу:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося створити тип");
        }
    }

    async editType(userId: string, typeId: string, updateTypeDto: UpdateTypeDto) {
        try {
            const { name } = updateTypeDto;

            const type = await this.prisma.type.findUnique({
                where: { id: typeId },
            });

            if (!type) {
                throw new NotFoundException("Тип з таким ID  не знайдено");
            }

            const existingType = await this.prisma.type.findUnique({
                where: { name },
            });

            if (existingType && existingType.id !== typeId) {
                throw new ConflictException("Тип з такою назвою вже існує");
            }

            const updatedType = await this.prisma.type.update({
                where: { id: typeId },
                data: updateTypeDto,
            });

            await this.adminRecentActions.createAction(userId, `Редаговано тип ${name}`);

            return {
                message: "Тип успішно оновлено",
                type: updatedType,
            };
        } catch (error: unknown) {
            console.error("Помилка редагування типу:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося оновити тип");
        }
    }

    async deleteType(userId: string, typeId: string) {
        try {
            const type = await this.prisma.type.findUnique({
                where: { id: typeId },
            });

            if (!type) {
                throw new NotFoundException("Тип з таким ID  не знайдено");
            }

            await this.prisma.type.delete({
                where: { id: typeId },
            });

            await this.adminRecentActions.createAction(userId, `Видалено тип ${type.name}`);

            return {
                message: "Тип успішно видалено",
            };
        } catch (error: unknown) {
            console.error("Помилка видалення типу:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося видалити тип");
        }
    }
}
