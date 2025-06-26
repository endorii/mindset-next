import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Prisma } from "generated/prisma";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async getProduct(collectionPath: string, categoryPath: string, productPath: string) {
        try {
            const product = await this.prisma.product.findUnique({
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
                    favorites: true,
                    productColors: {
                        include: {
                            color: true,
                        },
                    },
                    productTypes: {
                        include: {
                            type: true,
                        },
                    },
                    productSizes: {
                        include: {
                            size: true,
                        },
                    },
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
            price,
            available,
            description,
            composition,
            views,
            status,
            categoryId,
            banner,
            images,
            colorIds,
            sizeIds,
            typeIds,
        } = createProductDto;

        const product = await this.prisma.product.create({
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

                productColors: {
                    create:
                        colorIds?.map((colorId) => ({
                            color: {
                                connect: { id: colorId },
                            },
                        })) || [],
                },
                productSizes: {
                    create:
                        sizeIds?.map((sizeId) => ({
                            size: {
                                connect: { id: sizeId },
                            },
                        })) || [],
                },
                productTypes: {
                    create:
                        typeIds?.map((typeId) => ({
                            type: {
                                connect: { id: typeId },
                            },
                        })) || [],
                },
            },

            include: {
                productColors: {
                    include: { color: true },
                },
                productSizes: {
                    include: { size: true },
                },
                productTypes: {
                    include: { type: true },
                },
                category: true,
            },
        });

        return {
            message: "Продукт успішно створено",
            product,
        };
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

        const productToUpdate = await this.prisma.product.findUnique({
            where: {
                categoryId_path: {
                    categoryId: category.id,
                    path: productPath,
                },
            },
        });

        if (!productToUpdate) {
            throw new Error("Продукт не знайдено");
        }

        const { colorIds, sizeIds, typeIds, ...restOfProductData } = updateProductDto;

        const dataToUpdate: Prisma.ProductUpdateInput = {
            ...restOfProductData,
            updatedAt: new Date(),
        };

        if (colorIds !== undefined) {
            dataToUpdate.productColors = {
                deleteMany: {
                    productId: productToUpdate.id,
                },
            };
            if (colorIds.length > 0) {
                const colorsToConnect = colorIds.map((colorId) => ({
                    color: { connect: { id: colorId } },
                }));
                dataToUpdate.productColors = {
                    ...dataToUpdate.productColors,
                    create: colorsToConnect,
                };
            }
        }

        if (sizeIds !== undefined) {
            dataToUpdate.productSizes = {
                deleteMany: {
                    productId: productToUpdate.id,
                },
            };
            if (sizeIds.length > 0) {
                const sizesToConnect = sizeIds.map((sizeId) => ({
                    size: { connect: { id: sizeId } },
                }));
                dataToUpdate.productSizes = {
                    ...dataToUpdate.productSizes,
                    create: sizesToConnect,
                };
            }
        }

        if (typeIds !== undefined) {
            dataToUpdate.productTypes = {
                deleteMany: {
                    productId: productToUpdate.id,
                },
            };
            if (typeIds.length > 0) {
                const typesToConnect = typeIds.map((typeId) => ({
                    type: { connect: { id: typeId } },
                }));
                dataToUpdate.productTypes = {
                    ...dataToUpdate.productTypes,
                    create: typesToConnect,
                };
            }
        }

        const updatedProduct = await this.prisma.product.update({
            where: {
                categoryId_path: {
                    categoryId: category.id,
                    path: productPath,
                },
            },
            data: dataToUpdate,
            include: {
                productColors: {
                    include: { color: true },
                },
                productSizes: {
                    include: { size: true },
                },
                productTypes: {
                    include: { type: true },
                },
                category: true,
            },
        });

        return {
            message: "Продукт успішно оновлено",
            product: updatedProduct,
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
