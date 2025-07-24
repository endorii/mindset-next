import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { RecentActionsService } from "src/recent-actions/recent-actions.service";

@Injectable()
export class CategoriesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly recentActions: RecentActionsService
    ) {}

    async getCategory(collectionPath: string, categoryPath: string) {
        try {
            const category = await this.prisma.category.findFirst({
                where: {
                    path: categoryPath,
                    collection: { path: collectionPath },
                },
                include: {
                    collection: true,
                    products: {
                        include: {
                            productColors: {
                                include: { color: true },
                            },
                            productTypes: {
                                include: { type: true },
                            },
                            productSizes: {
                                include: { size: true },
                            },
                        },
                    },
                },
            });

            if (!category) throw new Error("Категорія не знайдена");

            return category;
        } catch (error) {
            console.error("Помилка отримання категорії:", error);
            throw error;
        }
    }

    async postCategory(userId: string, createCategoryDto: CreateCategoryDto) {
        const { name, path, description, banner, views, status, collectionId } = createCategoryDto;

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
                data: {
                    name,
                    path,
                    banner,
                    description,
                    views,
                    status,
                    collectionId,
                },
            });

            await this.recentActions.createAction(userId, `Додано категорію ${category.name}`);

            return category;
        } catch (error) {
            console.error("Помилка створення категорії:", error);
            throw error;
        }
    }

    async editCategory(
        userId: string,
        collectionPath: string,
        categoryPath: string,
        updateCategoryDto: UpdateCategoryDto
    ) {
        try {
            const { name, path, description, banner, views, status, collectionId } =
                updateCategoryDto;

            const collection = await this.prisma.collection.findUnique({
                where: { path: collectionPath },
            });

            if (!collection) {
                throw new Error("Колекцію не знайдено");
            }

            const category = await this.prisma.category.update({
                where: {
                    collectionId_path: {
                        collectionId: collection.id,
                        path: categoryPath,
                    },
                },
                data: {
                    name,
                    path,
                    description,
                    banner,
                    views,
                    status,
                    collectionId,
                },
            });

            await this.recentActions.createAction(userId, `Редаговано категорію ${category.name}`);

            return {
                message: "Категорію успішно оновлено",
                category,
            };
        } catch (error) {
            console.error("Помилка редагування категорії:", error);
            throw error;
        }
    }

    async deleteCategory(userId: string, collectionPath: string, categoryPath: string) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: { path: collectionPath },
            });

            if (!collection) {
                throw new Error("Колекцію не знайдено");
            }

            const category = await this.prisma.category.findFirst({
                where: {
                    path: categoryPath,
                },
            });

            if (!category) {
                throw new Error("Категорію не знайдено");
            }

            await this.prisma.category.delete({
                where: {
                    collectionId_path: {
                        collectionId: collection.id,
                        path: categoryPath,
                    },
                },
            });

            await this.recentActions.createAction(userId, `Видалено категорію ${category.name}`);

            return {
                message: "Категорію успішно видалено",
            };
        } catch (error) {
            console.error("Помилка видалення категорії:", error);
            throw error;
        }
    }
}
