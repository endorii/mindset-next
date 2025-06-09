import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
// import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async getProduct(collectionPath: string, categoryPath: string, productPath: string) {
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
                    colors: true,
                    category: {
                        include: {
                            collection: true,
                        },
                    },
                },
            });

            if (!product) throw new Error("Продукт не знайдено");

            return product;
        } catch (error) {
            console.error("Помилка отримання продукту:", error);
            throw new Error("Не вдалося отримати продукт.");
        }
    }

    async postProduct(createProductDto: CreateProductDto) {
        const {
            name,
            path,
            views,
            status,
            categoryId,
            price,
            available,
            description,
            composition,
            banner,
            images,
        } = createProductDto;
        try {
            return await this.prisma.product.create({
                data: {
                    name,
                    path,
                    price,
                    available,
                    description,
                    composition,
                    views,
                    status,
                    categoryId,
                    banner,
                    images,
                },
            });
        } catch (error) {
            console.error("Помилка створення продукту:", error);
            throw new Error("Не вдалося створити продукт");
        }
    }

    async editProduct(
        collectionPath: string,
        categoryPath: string,
        productPath: string,
        updateProductDto: UpdateProductDto
    ) {
        const collection = await this.prisma.collection.findUnique({
            where: { path: collectionPath },
        });

        if (!collection) {
            throw new Error("Колекцію не знайдено");
        }

        const category = await this.prisma.category.findUnique({
            where: {
                collectionId_path: {
                    collectionId: collection.id,
                    path: categoryPath,
                },
            },
        });

        if (!category) {
            throw new Error("Категорію не знайдено");
        }

        await this.prisma.product.update({
            where: {
                categoryId_path: {
                    categoryId: category.id,
                    path: productPath,
                },
            },
            data: updateProductDto,
        });

        return {
            message: "Продукт успішно оновлено",
            category,
        };
    }

    async deleteProduct(collectionPath: string, categoryPath: string, productPath: string) {
        const collection = await this.prisma.collection.findUnique({
            where: { path: collectionPath },
        });

        if (!collection) {
            throw new Error("Колекцію не знайдено");
        }

        const category = await this.prisma.category.findUnique({
            where: {
                collectionId_path: {
                    collectionId: collection.id,
                    path: categoryPath,
                },
            },
        });

        if (!category) {
            throw new Error("Категорію не знайдено");
        }

        await this.prisma.product.delete({
            where: {
                categoryId_path: {
                    categoryId: category.id,
                    path: productPath,
                },
            },
        });

        return {
            message: "Продукт успішно видалено",
        };
    }
}
