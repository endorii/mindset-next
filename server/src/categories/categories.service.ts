import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
    constructor(private readonly prisma: PrismaService) {}

    async getCategory(collectionPath: string, categoryPath: string) {
        try {
            const category = await this.prisma.category.findFirst({
                where: {
                    path: categoryPath,
                    collection: { path: collectionPath },
                },
                include: {
                    collection: true,
                    products: true,
                },
            });

            if (!category) throw new Error("Категорія не знайдена");

            return category;
        } catch (error) {
            console.error("Помилка отримання категорії:", error);
            throw new Error("Не вдалося отримати категорію.");
        }
    }

    async postCategory(createCategoryDto: CreateCategoryDto) {
        const { name, path, banner, views, status, collectionId } = createCategoryDto;
        try {
            return await this.prisma.category.create({
                data: {
                    name,
                    path,
                    banner,
                    views,
                    status,
                    collectionId,
                },
            });
        } catch (error) {
            console.error("Помилка створення категорії:", error);
            throw new Error("Не вдалося створити категорію");
        }
    }

    // async deleteCategory(id: string) {
    //     try {
    //         const existing = await this.prisma.category.findUnique({ where: { id } });

    //         if (!existing) {
    //             throw new NotFoundException(`Collection with id ${id} not found`);
    //         }

    //         return await this.prisma.category.delete({
    //             where: { id },
    //         });
    //     } catch (error) {
    //         console.error("Delete error:", error);
    //         throw new InternalServerErrorException("Failed to delete collection");
    //     }
    // }
}
