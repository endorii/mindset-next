import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";

@Injectable()
export class AdminCategoriesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService
    ) {}

    async postCategory(userId: string, createCategoryDto: CreateCategoryDto) {
        const { path, collectionId } = createCategoryDto;

        try {
            const existingCategory = await this.prisma.category.findUnique({
                where: {
                    collectionId_path: {
                        collectionId,
                        path,
                    },
                },
            });

            if (existingCategory) {
                throw new BadRequestException("Категорія з таким шляхом уже існує в цій колекції");
            }

            const category = await this.prisma.category.create({
                data: createCategoryDto,
            });

            await this.adminRecentActions.createAction(userId, `Додано категорію ${category.name}`);

            return category;
        } catch (error) {
            console.error("Помилка створення категорії:", error);

            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException(
                "Не вдалося створити категорію через внутрішню помилку"
            );
        }
    }

    async editCategory(userId: string, categoryId: string, updateCategoryDto: UpdateCategoryDto) {
        try {
            const category = await this.prisma.category.findUnique({
                where: { id: categoryId },
            });

            if (!category) {
                throw new NotFoundException("Категорію не знайдено");
            }

            const updatedCategory = await this.prisma.category.update({
                where: { id: categoryId },
                data: updateCategoryDto,
            });

            await this.adminRecentActions.createAction(
                userId,
                `Редаговано категорію ${updatedCategory.name}`
            );

            return {
                message: "Категорію успішно оновлено",
                category: updatedCategory,
            };
        } catch (error) {
            console.error("Помилка редагування категорії:", error);

            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new InternalServerErrorException(
                "Не вдалося оновити категорію через внутрішню помилку"
            );
        }
    }

    async deleteCategory(userId: string, categoryId: string) {
        try {
            const category = await this.prisma.category.findUnique({
                where: {
                    id: categoryId,
                },
            });

            if (!category) {
                throw new NotFoundException("Категорію не знайдено");
            }

            await this.prisma.category.delete({
                where: {
                    id: categoryId,
                },
            });

            await this.adminRecentActions.createAction(
                userId,
                `Видалено категорію ${category.name}`
            );

            return {
                message: "Категорію успішно видалено",
            };
        } catch (error) {
            console.error("Помилка видалення категорії:", error);

            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new InternalServerErrorException(
                "Не вдалося видалити категорію через внутрішню помилку"
            );
        }
    }
}
