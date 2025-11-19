import {
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class AdminCategoriesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService
    ) {}

    async postCategory(userId: string, createCategoryDto: CreateCategoryDto) {
        const { path, collectionId } = createCategoryDto;

        try {
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

            return { message: "Category successfully created", data: category };
        } catch (error) {
            console.error("Category creation error:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(
                "Category could not be created due to an internal error."
            );
        }
    }

    async editCategory(userId: string, categoryId: string, updateCategoryDto: UpdateCategoryDto) {
        try {
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

            return {
                message: "Category successfully updated",
                category: updatedCategory,
            };
        } catch (error) {
            console.error("Category editing error:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(
                "Failed to update category due to an internal error"
            );
        }
    }

    async deleteCategory(userId: string, categoryId: string) {
        try {
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

            return {
                message: "Category successfully deleted",
            };
        } catch (error) {
            console.error("Category deleting error:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(
                "Failed to delete the category due to an internal error"
            );
        }
    }
}
