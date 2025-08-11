import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ShopCollectionsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllCollections() {
        try {
            const collections = await this.prisma.collection.findMany({
                include: {
                    categories: true,
                },
            });

            if (!collections || collections.length === 0) {
                throw new NotFoundException("Колекцій не знайдено");
            }

            return collections;
        } catch (error) {
            console.error("Помилка отримання колекцій:", error);
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося отримати колекції");
        }
    }

    async getCollectionByPath(collectionPath: string) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: { path: collectionPath },
            });

            if (!collection) {
                throw new NotFoundException("Колекція не знайдена");
            }
            return collection;
        } catch (error) {
            console.error("Помилка отримання колекції:", error);
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося отримати колекцію");
        }
    }
}
