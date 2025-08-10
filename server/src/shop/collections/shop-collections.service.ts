import { Injectable } from "@nestjs/common";
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

            if (!collections) throw new Error("Колекцій не знайдено");

            return collections;
        } catch (error) {
            console.error("Помилка отримання колекцій:", error);
            throw new Error("Не вдалося отримати колекції");
        }
    }

    async getCollectionByPath(collectionPath: string) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: { path: collectionPath },
            });

            if (!collection) throw new Error("Колекція не знайдена");
            return collection;
        } catch (error) {
            console.error("Помилка отримання колекції:", error);
            throw new Error("Не вдалося отримати колекцію");
        }
    }
}
