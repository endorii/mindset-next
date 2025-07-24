import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";
import { RecentActionsService } from "src/recent-actions/recent-actions.service";

@Injectable()
export class CollectionsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly recentActions: RecentActionsService
    ) {}

    async getCollections() {
        try {
            return await this.prisma.collection.findMany({
                include: {
                    categories: true,
                },
            });
        } catch (error) {
            console.error("Помилка отримання колекцій:", error);
            throw new Error("Не вдалося отримати колекції");
        }
    }

    async getCollection(collectionPath: string) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: { path: collectionPath },
                include: { categories: { include: { products: true } } },
            });

            if (!collection) throw new Error("Колекція не знайдена");
            return collection;
        } catch (error) {
            console.error("Помилка отримання колекції:", error);
            throw new Error("Не вдалося отримати колекцію");
        }
    }

    async postCollection(userId: string, createCollectionDto: CreateCollectionDto) {
        const { name, path, description, banner, views, status } = createCollectionDto;

        try {
            const existingCollection = await this.prisma.collection.findUnique({
                where: { path },
            });
            if (existingCollection) {
                throw new BadRequestException("Колекція з таким шляхом уже існує");
            }

            const collection = await this.prisma.collection.create({
                data: {
                    name,
                    path,
                    description,
                    banner,
                    views,
                    status,
                },
            });

            await this.recentActions.createAction(userId, `Додано колекцію ${collection.name}`);

            return {
                message: "Колекцію успішно створено",
                collection,
            };
        } catch (error) {
            console.error("Помилка створення колекції:", error);
            throw new Error("Не вдалося створити колекцію");
        }
    }

    async editCollection(
        userId: string,
        collectionPath: string,
        updateCollectionDto: UpdateCollectionDto
    ) {
        if (!updateCollectionDto) {
            throw new BadRequestException("Дані для оновлення не надано");
        }

        try {
            const { name, path, description, banner, status } = updateCollectionDto;

            const collection = await this.prisma.collection.update({
                where: {
                    path: collectionPath,
                },
                data: {
                    name,
                    path,
                    description,
                    banner,
                    status,
                },
            });

            await this.recentActions.createAction(userId, `Редаговано колекцію ${collection.name}`);

            return {
                message: "Колекцію успішно оновлено",
                collection,
            };
        } catch (error) {
            console.error("Помилка редагування колекції:", error);
            throw new Error("Не вдалося оновити колекцію");
        }
    }

    async deleteCollection(userId: string, collectionPath: string) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: { path: collectionPath },
            });

            if (!collection) throw new Error("Колекцію не знайдено");

            await this.prisma.collection.delete({
                where: {
                    path: collectionPath,
                },
            });

            await this.recentActions.createAction(userId, `Видалено колекцію ${collection.name}`);

            return {
                message: "Колекцію успішно видалено",
            };
        } catch (error) {
            console.error("Помилка видалення колекції:", error);
            throw new Error("Не вдалося видалити колекцію");
        }
    }
}
