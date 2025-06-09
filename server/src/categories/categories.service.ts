import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) {}

    async getCategory(collectionPath: string, categoryPath: string) {
        try {
            const category = await this.prisma.category.findFirst({
                where: {
                    path: categoryPath,
                    collection: { path: collectionPath },
                },
                include: {
                    collection: true,
                    products: true,
                },
            });

            if (!category) throw new Error("Категорія не знайдена");

            return category;
        } catch (error) {
            console.error("Помилка отримання категорії:", error);
            throw new Error("Не вдалося отримати категорію.");
        }
    }

    async postCategory(createCategoryDto: CreateCategoryDto) {
        const { name, path, banner, views, status, collectionId } = createCategoryDto;
        try {
            return await this.prisma.category.create({
                data: {
                    name,
                    path,
                    banner,
                    views,
                    status,
                    collectionId,
                },
            });
        } catch (error) {
            console.error("Помилка створення категорії:", error);
            throw new Error("Не вдалося створити категорію");
        }
    }

    async editCategory(
        collectionPath: string,
        categoryPath: string,
        updateCategoryDto: UpdateCategoryDto
    ) {
        const collection = await this.prisma.collection.findUnique({
            where: { path: collectionPath },
        });

        if (!collection) {
            throw new Error("Колекцію не знайдено");
        }

        const { name, path, banner, views, status, collectionId } = updateCategoryDto;

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
                banner,
                views,
                status,
                collectionId,
            },
        });

        return {
            message: "Категорію успішно оновлено",
            category,
        };
    }

    async deleteCategory(collectionPath: string, categoryPath: string) {
        const collection = await this.prisma.collection.findUnique({
            where: { path: collectionPath },
        });

        if (!collection) {
            throw new Error("Колекцію не знайдено");
        }

        await this.prisma.category.delete({
            where: {
                collectionId_path: {
                    collectionId: collection.id,
                    path: categoryPath,
                },
            },
        });

        return {
            message: "Категорію успішно видалено",
        };
    }
}
