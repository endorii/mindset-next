import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async getProductsByCategoryId(categoryId: string) {
        try {
            const products = await this.prisma.product.findMany({
                where: { category: { id: categoryId } },
                include: {
                    productColors: { include: { color: true } },
                    productTypes: { include: { type: true } },
                    productSizes: { include: { size: true } },
                },
            });

            if (!products || products.length === 0) {
                throw new NotFoundException("Товарів не знайдено");
            }

            return products;
        } catch (error) {
            console.error("Помилка отримання товарів:", error);
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException("Не вдалося отримати товари");
        }
    }

    async getProductByPath(collectionPath: string, categoryPath: string, productPath: string) {
        try {
            const product = await this.prisma.product.findFirst({
                where: {
                    path: productPath,
                    category: {
                        path: categoryPath,
                        collection: {
                            path: collectionPath,
                        },
                    },
                },
                include: {
                    productColors: { include: { color: true } },
                    productTypes: { include: { type: true } },
                    productSizes: { include: { size: true } },
                    category: { include: { collection: true } },
                },
            });

            if (!product) {
                throw new NotFoundException("Товар не знайдено");
            }

            return product;
        } catch (error) {
            console.error("Помилка отримання товару:", error);
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException("Не вдалося отримати товар");
        }
    }

    async getPopularProducts() {
        try {
            const popularProductGroups = await this.prisma.orderItem.groupBy({
                by: ["productId"],
                _sum: { quantity: true },
                orderBy: { _sum: { quantity: "desc" } },
                take: 20,
            });

            const productIds = popularProductGroups.map((group) => group.productId);

            const products = await this.prisma.product.findMany({
                where: { id: { in: productIds } },
                include: {
                    productColors: { include: { color: true } },
                    productTypes: { include: { type: true } },
                    productSizes: { include: { size: true } },
                    category: { include: { collection: true } },
                },
            });

            return products;
        } catch (error) {
            console.error("Помилка отримання популярних товарів:", error);
            throw new InternalServerErrorException("Не вдалося отримати популярні товари");
        }
    }

    async getProductsFromCollection(collectionId: string) {
        try {
            const products = await this.prisma.product.findMany({
                where: {
                    category: {
                        collection: {
                            id: collectionId,
                        },
                    },
                },
                include: {
                    productColors: { include: { color: true } },
                    productTypes: { include: { type: true } },
                    productSizes: { include: { size: true } },
                    category: { include: { collection: true } },
                },
                take: 20,
            });

            if (!products || products.length === 0) {
                throw new NotFoundException("Товарів у колекції не знайдено");
            }

            return products;
        } catch (error) {
            console.error("Помилка отримання товарів з колекції:", error);
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException("Не вдалося отримати товари з колекції");
        }
    }
}
