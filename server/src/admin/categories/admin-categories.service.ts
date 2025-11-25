import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RevalidateService } from "src/revalidate/revalidate.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class AdminCategoriesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService,
        private readonly revalidateService: RevalidateService
    ) {}

    async postCategory(userId: string, createCategoryDto: CreateCategoryDto) {
        const { path, collectionId } = createCategoryDto;

        const existingCategory = await this.prisma.category.findUnique({
            where: {
                collectionId_path: {
                    collectionId,
                    path,
                },
            },
        });

        if (existingCategory) {
            throw new ConflictException(
                "Category with this path already exists in this collection."
            );
        }

        const category = await this.prisma.category.create({
            data: createCategoryDto,
        });

        await this.adminRecentActions.createAction(userId, `Added category ${category.name}`);

        await this.revalidateService.revalidate("/categories");

        return { message: "Category successfully created", data: category };
    }

    async editCategory(userId: string, categoryId: string, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (!category) {
            throw new NotFoundException("Category with this ID not found");
        }

        if (updateCategoryDto.path && updateCategoryDto.path !== category.path) {
            const existingCategory = await this.prisma.category.findUnique({
                where: {
                    collectionId_path: {
                        collectionId: category.collectionId,
                        path: updateCategoryDto.path,
                    },
                },
            });

            if (existingCategory) {
                throw new ConflictException(
                    "Category with this path already exists in this collection"
                );
            }
        }

        const updatedCategory = await this.prisma.category.update({
            where: { id: categoryId },
            data: updateCategoryDto,
        });

        await this.adminRecentActions.createAction(
            userId,
            `Edited category ${updatedCategory.name}`
        );

        await this.revalidateService.revalidate("/categories");

        return {
            message: "Category successfully updated",
            category: updatedCategory,
        };
    }

    async deleteCategory(userId: string, categoryId: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                id: categoryId,
            },
            include: {
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });

        if (!category) {
            throw new NotFoundException("Category with this ID not found");
        }

        if (category._count?.products > 0) {
            throw new ConflictException(
                "Cannot delete a category that contains products. First remove or transfer all products."
            );
        }

        await this.prisma.category.delete({
            where: {
                id: categoryId,
            },
        });

        await this.adminRecentActions.createAction(userId, `Deleted category ${category.name}`);

        await this.revalidateService.revalidate("/categories");

        return {
            message: "Category successfully deleted",
        };
    }
}
