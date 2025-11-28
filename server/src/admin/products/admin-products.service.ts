import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { RevalidateService } from "src/revalidate/revalidate.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class AdminProductsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService,
        private readonly revalidateService: RevalidateService
    ) {}

    async postProduct(userId: string, createProductDto: CreateProductDto) {
        const { path, categoryId, colorIds, sizeIds, typeIds, ...rest } = createProductDto;

        const existingProduct = await this.prisma.product.findUnique({
            where: { categoryId_path: { categoryId, path } },
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
                        colorIds?.map((colorId) => ({ color: { connect: { id: colorId } } })) || [],
                },
                productSizes: {
                    create: sizeIds?.map((sizeId) => ({ size: { connect: { id: sizeId } } })) || [],
                },
                productTypes: {
                    create: typeIds?.map((typeId) => ({ type: { connect: { id: typeId } } })) || [],
                },
            },
            include: {
                category: {
                    include: {
                        collection: { select: { path: true } },
                    },
                },
            },
        });

        await this.adminRecentActions.createAction(userId, `Added product ${product.name}`);

        await this.revalidateService.revalidate(
            `/${product.category.collection.path}/${product.category.path}`
        );
        await this.revalidateService.revalidate(
            `/${product.category.collection.path}/${product.category.path}/${product.path}`
        );

        return { message: "Product successfully created", data: product };
    }

    async editProduct(userId: string, productId: string, updateProductDto: UpdateProductDto) {
        const { colorIds, sizeIds, typeIds, images, ...rest } = updateProductDto;

        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: {
                category: { include: { collection: { select: { path: true } } } },
            },
        });

        if (!product) {
            throw new NotFoundException("Product with this ID not found");
        }

        const dataToUpdate: Prisma.ProductUpdateInput = {
            ...rest,
            updatedAt: new Date(),
        };

        if (images !== undefined) {
            dataToUpdate.images = images; // Це повністю замінює старий масив
        }

        if (colorIds !== undefined) {
            dataToUpdate.productColors = {
                deleteMany: { productId },
                create: colorIds.map((id) => ({ color: { connect: { id } } })),
            };
        }

        if (sizeIds !== undefined) {
            dataToUpdate.productSizes = {
                deleteMany: { productId },
                create: sizeIds.map((id) => ({ size: { connect: { id } } })),
            };
        }

        if (typeIds !== undefined) {
            dataToUpdate.productTypes = {
                deleteMany: { productId },
                create: typeIds.map((id) => ({ type: { connect: { id } } })),
            };
        }

        const updatedProduct = await this.prisma.product.update({
            where: { id: productId },
            data: dataToUpdate,
            include: {
                category: { include: { collection: { select: { path: true } } } },
            },
        });

        await this.adminRecentActions.createAction(userId, `Edited product ${updatedProduct.name}`);

        await this.revalidateService.revalidate(
            `/${updatedProduct.category.collection.path}/${updatedProduct.category.path}`
        );
        await this.revalidateService.revalidate(
            `/${updatedProduct.category.collection.path}/${updatedProduct.category.path}/${updatedProduct.path}`
        );

        return { message: "Product successfully updated", product: updatedProduct };
    }

    async deleteProduct(userId: string, productId: string) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: {
                category: { include: { collection: { select: { path: true } } } },
            },
        });

        if (!product) {
            throw new NotFoundException("Product with this ID not found");
        }

        await this.prisma.product.delete({ where: { id: productId } });

        await this.adminRecentActions.createAction(userId, `Deleted product ${product.name}`);

        await this.revalidateService.revalidate(
            `/${product.category.collection.path}/${product.category.path}`
        );
        await this.revalidateService.revalidate(
            `/${product.category.collection.path}/${product.category.path}/${product.path}`
        );

        return { message: "Product successfully deleted" };
    }

    async getCategoryProducts(categoryId: string) {
        const products = await this.prisma.product.findMany({
            where: { categoryId },
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

        if (!products) {
            throw new NotFoundException("Products not found");
        }
        return products;
    }
}
