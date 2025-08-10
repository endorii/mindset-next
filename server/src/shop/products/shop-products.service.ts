import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async getProductsByCategoryId(categoryId: string) {
        try {
            const products = await this.prisma.product.findMany({
                where: {
                    category: {
                        id: categoryId,
                    },
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
            });

            if (!products) throw new Error("Товарів не знайдено");

            return products;
        } catch (error) {
            console.error("Помилка отримання товарів:", error);
            throw new Error("Не вдалося отримати товари.");
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

            if (!product) throw new Error("Товар не знайдено");
            return product;
        } catch (error) {
            console.error("Помилка отримання товару:", error);
            throw new Error("Не вдалося отримати товар");
        }
    }

    async getPopularProducts() {
        try {
            const popularProductGroups = await this.prisma.orderItem.groupBy({
                by: ["productId"],
                _sum: {
                    quantity: true,
                },
                orderBy: {
                    _sum: {
                        quantity: "desc",
                    },
                },
                take: 20,
            });

            const productIds = popularProductGroups.map((group) => group.productId);

            const products = await this.prisma.product.findMany({
                where: {
                    id: {
                        in: productIds,
                    },
                },
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
            throw new Error("Не вдалося отримати популярні товари.");
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
            console.error("Помилка отримання товарів з колекції:", error);
            throw new Error("Не вдалося отримати товари з колекції.");
        }
    }

    // async postProduct(userId: string, createProductDto: CreateProductDto) {
    //     try {
    //         const {
    //             name,
    //             path,
    //             price,
    //             oldPrice,
    //             available,
    //             description,
    //             composition,
    //             views,
    //             status,
    //             categoryId,
    //             banner,
    //             images,
    //             colorIds,
    //             sizeIds,
    //             typeIds,
    //         } = createProductDto;

    //         const existingProduct = await this.prisma.product.findUnique({
    //             where: {
    //                 categoryId_path: {
    //                     categoryId,
    //                     path,
    //                 },
    //             },
    //         });

    //         if (existingProduct) {
    //             throw new ConflictException("Товар з таким шляхом вже існує");
    //         }

    //         const product = await this.prisma.product.create({
    //             data: {
    //                 name,
    //                 path,
    //                 price,
    //                 oldPrice,
    //                 available,
    //                 description,
    //                 composition,
    //                 views,
    //                 status,
    //                 categoryId,
    //                 banner,
    //                 images,
    //                 productColors: {
    //                     create:
    //                         colorIds?.map((colorId) => ({
    //                             color: { connect: { id: colorId } },
    //                         })) || [],
    //                 },
    //                 productSizes: {
    //                     create:
    //                         sizeIds?.map((sizeId) => ({
    //                             size: { connect: { id: sizeId } },
    //                         })) || [],
    //                 },
    //                 productTypes: {
    //                     create:
    //                         typeIds?.map((typeId) => ({
    //                             type: { connect: { id: typeId } },
    //                         })) || [],
    //                 },
    //             },
    //             include: {
    //                 productColors: { include: { color: true } },
    //                 productSizes: { include: { size: true } },
    //                 productTypes: { include: { type: true } },
    //                 category: true,
    //             },
    //         });

    //         await this.adminRecentActions.createAction(userId, `Додано товар ${product.name}`);

    //         return {
    //             message: "Товар успішно створено",
    //             product,
    //         };
    //     } catch (error) {
    //         console.error("Помилка створення товару:", error);
    //         throw new Error("Не вдалося створити товар.");
    //     }
    // }

    // async editProduct(
    //     userId: string,
    //     collectionPath: string,
    //     categoryPath: string,
    //     productPath: string,
    //     updateProductDto: UpdateProductDto
    // ) {
    //     try {
    //         const collection = await this.prisma.collection.findUnique({
    //             where: { path: collectionPath },
    //         });

    //         if (!collection) throw new Error("Колекцію не знайдено");

    //         const category = await this.prisma.category.findUnique({
    //             where: {
    //                 collectionId_path: {
    //                     collectionId: collection.id,
    //                     path: categoryPath,
    //                 },
    //             },
    //         });

    //         if (!category) throw new Error("Категорію не знайдено");

    //         const productToUpdate = await this.prisma.product.findUnique({
    //             where: {
    //                 categoryId_path: {
    //                     categoryId: category.id,
    //                     path: productPath,
    //                 },
    //             },
    //         });

    //         if (!productToUpdate) throw new Error("Товар не знайдено");

    //         const { colorIds, sizeIds, typeIds, ...restOfProductData } = updateProductDto;

    //         const dataToUpdate: Prisma.ProductUpdateInput = {
    //             ...restOfProductData,
    //             updatedAt: new Date(),
    //         };

    //         if (colorIds !== undefined) {
    //             dataToUpdate.productColors = {
    //                 deleteMany: { productId: productToUpdate.id },
    //             };
    //             if (colorIds.length > 0) {
    //                 dataToUpdate.productColors = {
    //                     ...dataToUpdate.productColors,
    //                     create: colorIds.map((colorId) => ({
    //                         color: { connect: { id: colorId } },
    //                     })),
    //                 };
    //             }
    //         }

    //         if (sizeIds !== undefined) {
    //             dataToUpdate.productSizes = {
    //                 deleteMany: { productId: productToUpdate.id },
    //             };
    //             if (sizeIds.length > 0) {
    //                 dataToUpdate.productSizes = {
    //                     ...dataToUpdate.productSizes,
    //                     create: sizeIds.map((sizeId) => ({
    //                         size: { connect: { id: sizeId } },
    //                     })),
    //                 };
    //             }
    //         }

    //         if (typeIds !== undefined) {
    //             dataToUpdate.productTypes = {
    //                 deleteMany: { productId: productToUpdate.id },
    //             };
    //             if (typeIds.length > 0) {
    //                 dataToUpdate.productTypes = {
    //                     ...dataToUpdate.productTypes,
    //                     create: typeIds.map((typeId) => ({
    //                         type: { connect: { id: typeId } },
    //                     })),
    //                 };
    //             }
    //         }

    //         const updatedProduct = await this.prisma.product.update({
    //             where: {
    //                 categoryId_path: {
    //                     categoryId: category.id,
    //                     path: productPath,
    //                 },
    //             },
    //             data: dataToUpdate,
    //             include: {
    //                 productColors: { include: { color: true } },
    //                 productSizes: { include: { size: true } },
    //                 productTypes: { include: { type: true } },
    //                 category: true,
    //             },
    //         });

    //         await this.adminRecentActions.createAction(
    //             userId,
    //             `Редаговано товар ${updatedProduct.name}`
    //         );

    //         return {
    //             message: "Товар успішно оновлено",
    //             product: updatedProduct,
    //         };
    //     } catch (error) {
    //         console.error("Помилка оновлення товару:", error);
    //         throw new Error("Не вдалося оновити товар.");
    //     }
    // }

    // async deleteProduct(
    //     userId: string,
    //     collectionPath: string,
    //     categoryPath: string,
    //     productPath: string
    // ) {
    //     try {
    //         const collection = await this.prisma.collection.findUnique({
    //             where: { path: collectionPath },
    //         });

    //         if (!collection) throw new Error("Колекцію не знайдено");

    //         const category = await this.prisma.category.findUnique({
    //             where: {
    //                 collectionId_path: {
    //                     collectionId: collection.id,
    //                     path: categoryPath,
    //                 },
    //             },
    //         });

    //         if (!category) throw new Error("Категорію не знайдено");

    //         const product = await this.prisma.product.findUnique({
    //             where: {
    //                 categoryId_path: {
    //                     categoryId: category.id,
    //                     path: productPath,
    //                 },
    //             },
    //         });

    //         if (!product) throw new Error("Товар не знайдено");

    //         await this.prisma.product.delete({
    //             where: {
    //                 categoryId_path: {
    //                     categoryId: category.id,
    //                     path: productPath,
    //                 },
    //             },
    //         });

    //         await this.adminRecentActions.createAction(userId, `Видалено товар ${product.name}`);

    //         return {
    //             message: "Товар успішно видалено",
    //         };
    //     } catch (error) {
    //         console.error("Помилка видалення товару:", error);
    //         throw new Error("Не вдалося видалити товар.");
    //     }
    // }
}
