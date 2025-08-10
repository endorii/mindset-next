import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ShopCategoriesService {
    constructor(private readonly prisma: PrismaService) {}

    async getCategoriesByCollectionId(collectionId: string) {
        try {
            const categories = await this.prisma.category.findMany({
                where: {
                    collection: { id: collectionId },
                },
                include: {
                    // collection: true,
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

            if (!categories) throw new Error("Категорій не знайдено");

            return categories;
        } catch (error) {
            console.error("Помилка отримання категорій:", error);
            throw error;
        }
    }

    async getCategoryByPath(collectionPath: string, categoryPath: string) {
        try {
            const category = await this.prisma.category.findFirst({
                where: {
                    path: categoryPath,
                    collection: {
                        path: collectionPath,
                    },
                },
            });

            if (!category) throw new Error("Категорію не знайдено");

            return category;
        } catch (error) {
            console.error("Помилка отримання категорії:", error);
            throw error;
        }
    }
}
