import {
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class AdminProductsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService
    ) {}

    async postProduct(userId: string, createProductDto: CreateProductDto) {
        try {
            const { path, categoryId, colorIds, sizeIds, typeIds, ...rest } = createProductDto;

            const existingProduct = await this.prisma.product.findUnique({
                where: {
                    categoryId_path: { categoryId, path },
                },
            });

            if (existingProduct) {
                throw new ConflictException("A product with this path already exists");
            }

            const product = await this.prisma.product.create({
                data: {
                    ...rest,
                    categoryId,
                    path,
                    productColors: {
                        create:
                            colorIds?.map((colorId) => ({
                                color: { connect: { id: colorId } },
                            })) || [],
                    },
                    productSizes: {
                        create:
                            sizeIds?.map((sizeId) => ({
                                size: { connect: { id: sizeId } },
                            })) || [],
                    },
                    productTypes: {
                        create:
                            typeIds?.map((typeId) => ({
                                type: { connect: { id: typeId } },
                            })) || [],
                    },
                },
                include: {
                    productColors: { include: { color: true } },
                    productSizes: { include: { size: true } },
                    productTypes: { include: { type: true } },
                    category: true,
                },
            });

            await this.adminRecentActions.createAction(userId, `Added product ${product.name}`);

            return {
                message: "Product successfully created",
                data: product,
            };
        } catch (error) {
            console.error("Error creating product:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to create product");
        }
    }

    async editProduct(userId: string, productId: string, updateProductDto: UpdateProductDto) {
        try {
            const { colorIds, sizeIds, typeIds, ...restOfProductData } = updateProductDto;

            const product = await this.prisma.product.findUnique({
                where: {
                    id: productId,
                },
            });

            if (!product) {
                throw new NotFoundException("Product with this ID not found");
            }

            const dataToUpdate: Prisma.ProductUpdateInput = {
                ...restOfProductData,
                updatedAt: new Date(),
            };

            if (colorIds !== undefined) {
                dataToUpdate.productColors = {
                    deleteMany: { productId: product.id },
                };
                if (colorIds.length > 0) {
                    dataToUpdate.productColors = {
                        ...dataToUpdate.productColors,
                        create: colorIds.map((colorId) => ({
                            color: { connect: { id: colorId } },
                        })),
                    };
                }
            }

            if (sizeIds !== undefined) {
                dataToUpdate.productSizes = {
                    deleteMany: { productId: product.id },
                };
                if (sizeIds.length > 0) {
                    dataToUpdate.productSizes = {
                        ...dataToUpdate.productSizes,
                        create: sizeIds.map((sizeId) => ({
                            size: { connect: { id: sizeId } },
                        })),
                    };
                }
            }

            if (typeIds !== undefined) {
                dataToUpdate.productTypes = {
                    deleteMany: { productId: product.id },
                };
                if (typeIds.length > 0) {
                    dataToUpdate.productTypes = {
                        ...dataToUpdate.productTypes,
                        create: typeIds.map((typeId) => ({
                            type: { connect: { id: typeId } },
                        })),
                    };
                }
            }

            const updatedProduct = await this.prisma.product.update({
                where: {
                    id: productId,
                },
                data: dataToUpdate,
                include: {
                    productColors: { include: { color: true } },
                    productSizes: { include: { size: true } },
                    productTypes: { include: { type: true } },
                    category: true,
                },
            });

            await this.adminRecentActions.createAction(
                userId,
                `Edited product ${updatedProduct.name}`
            );

            return {
                message: "Product successfully updated",
                product: updatedProduct,
            };
        } catch (error) {
            console.error("Error updating product:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to update product");
        }
    }

    async deleteProduct(userId: string, productId: string) {
        try {
            const product = await this.prisma.product.findUnique({
                where: {
                    id: productId,
                },
            });

            if (!product) {
                throw new NotFoundException("Product with this ID not found");
            }

            await this.prisma.product.delete({
                where: {
                    id: productId,
                },
            });

            await this.adminRecentActions.createAction(userId, `Deleted product ${product.name}`);

            return {
                message: "Product successfully deleted",
            };
        } catch (error) {
            console.error("Error deleting product:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to delete product");
        }
    }
}
