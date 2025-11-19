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

    async getAllCategories() {
        try {
            const categories = await this.prisma.category.findMany({
                include: {
                    collection: true,
                },
            });

            if (!categories) throw new NotFoundException("No categories found");

            return categories;
        } catch (error) {
            console.error("Error fetching categories:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Server error while fetching categories");
        }
    }

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

            if (!categories) throw new NotFoundException("No categories found");

            return categories;
        } catch (error) {
            console.error("Error fetching categories:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Server error while fetching categories");
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

            if (!category) throw new NotFoundException("Category not found");

            return category;
        } catch (error) {
            console.error("Error fetching category:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Server error while fetching category");
        }
    }
}
