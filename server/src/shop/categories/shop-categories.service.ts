import {
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
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

            if (!categories) throw new NotFoundException("Категорій не знайдено");

            return categories;
        } catch (error) {
            console.error("Помилка отримання категорій:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Помилка сервера при отриманні категорій");
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

            if (!category) throw new NotFoundException("Категорію не знайдено");

            return category;
        } catch (error) {
            console.error("Помилка отримання категорії:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Помилка сервера при отримання категорії");
        }
    }
}
