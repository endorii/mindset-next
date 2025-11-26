import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllProducts() {
        const products = await this.prisma.product.findMany({
            include: {
                category: {
                    include: {
                        collection: true,
                    },
                },
            },
        });

        return products;
    }

    async findByIds(ids: string[]) {
        return this.prisma.product.findMany({
            where: { id: { in: ids } },
            include: {
                category: {
                    select: {
                        path: true,
                        collection: {
                            select: {
                                path: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async getProductsByCategoryId(categoryId: string) {
        const products = await this.prisma.product.findMany({
            where: { category: { id: categoryId } },
            include: {
                productColors: { include: { color: true } },
                productTypes: { include: { type: true } },
                productSizes: { include: { size: true } },
            },
        });

        return products;
    }

    async getProductByPath(collectionPath: string, categoryPath: string, productPath: string) {
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
            throw new NotFoundException("Product not found");
        }

        return product;
    }

    async getPopularProducts() {
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
    }

    async getProductsFromCollection(collectionId: string) {
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

        return products;
    }

    async getProductColors(productId: string) {
        const colors = await this.prisma.productToColor.findMany({
            where: {
                productId,
            },
            include: {
                color: true,
            },
        });

        return colors;
    }

    async getProductTypes(productId: string) {
        const types = await this.prisma.productToType.findMany({
            where: {
                productId,
            },
            include: {
                type: true,
            },
        });

        return types;
    }

    async getProductSizes(productId: string) {
        const sizes = await this.prisma.productToSize.findMany({
            where: {
                productId,
            },
            include: {
                size: true,
            },
        });

        return sizes;
    }
}
