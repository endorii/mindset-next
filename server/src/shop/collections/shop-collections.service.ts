import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ShopCollectionsService {
    constructor(private readonly prisma: PrismaService) {}

    async getCollections() {
        const collections = await this.prisma.collection.findMany({
            where: { isVisible: true },
            include: {
                categories: {
                    where: {
                        isVisible: true,
                    },
                },
            },
        });

        return collections;
    }

    async getCollectionByPath(collectionPath: string) {
        const collection = await this.prisma.collection.findUnique({
            where: { path: collectionPath, isVisible: true },
            include: {
                categories: {
                    where: {
                        isVisible: true,
                    },
                },
            },
        });

        if (!collection) {
            throw new NotFoundException("Collection with this path not found");
        }
        return collection;
    }

    async getCategoryByPath(collectionPath: string, categoryPath: string) {
        const category = await this.prisma.category.findFirst({
            where: {
                isVisible: true,
                path: categoryPath,
                collection: {
                    path: collectionPath,
                },
            },
            include: {
                products: {
                    where: {
                        isVisible: true,
                    },
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
    }

    async getProductByPath(collectionPath: string, categoryPath: string, productPath: string) {
        const product = await this.prisma.product.findFirst({
            where: {
                isVisible: true,
                path: productPath,
                category: {
                    isVisible: true,
                    path: categoryPath,
                    collection: {
                        isVisible: true,
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
}
