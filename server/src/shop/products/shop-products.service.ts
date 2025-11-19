import {
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllProducts() {
        try {
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
        } catch (error) {
            console.error("Error fetching products:", error);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Failed to fetch products");
        }
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
        try {
            const products = await this.prisma.product.findMany({
                where: { category: { id: categoryId } },
                include: {
                    productColors: { include: { color: true } },
                    productTypes: { include: { type: true } },
                    productSizes: { include: { size: true } },
                },
            });

            return products;
        } catch (error) {
            console.error("Error fetching products by category:", error);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Failed to fetch products by category");
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
                throw new NotFoundException("Product not found");
            }

            return product;
        } catch (error) {
            console.error("Error fetching product by path:", error);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Failed to fetch product");
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
            console.error("Error fetching popular products:", error);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Failed to fetch popular products");
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

            return products;
        } catch (error) {
            console.error("Error fetching products from collection:", error);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Failed to fetch products from collection");
        }
    }
}
