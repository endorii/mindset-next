import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) {}

    getCategoriesFromCollection(collectionId: string) {
        return this.prisma.category.findMany({
            where: {
                collectionId,
            },
        });
    }

    async postCategory(createCategoryDto: CreateCategoryDto) {
        try {
            return await this.prisma.category.create({
                data: createCategoryDto,
            });
        } catch (error) {
            console.error("Помилка створення категорії:", error);
            throw new Error("Не вдалося створити категорію");
        }
    }

    async deleteCategory(id: string) {
        try {
            const existing = await this.prisma.category.findUnique({ where: { id } });

            if (!existing) {
                throw new NotFoundException(`Collection with id ${id} not found`);
            }

            return await this.prisma.category.delete({
                where: { id },
            });
        } catch (error) {
            console.error("Delete error:", error);
            throw new InternalServerErrorException("Failed to delete collection");
        }
    }
}
