import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
@Injectable()
export class AdminCollectionsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService
    ) {}

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

            await this.adminRecentActions.createAction(
                userId,
                `Додано колекцію ${collection.name}`
            );

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
        collectionId: string,
        updateCollectionDto: UpdateCollectionDto
    ) {
        if (!updateCollectionDto) {
            throw new BadRequestException("Дані для оновлення не надано");
        }

        try {
            const { name, path, description, banner, status } = updateCollectionDto;

            const collection = await this.prisma.collection.update({
                where: {
                    id: collectionId,
                },
                data: {
                    name,
                    path,
                    description,
                    banner,
                    status,
                },
            });

            await this.adminRecentActions.createAction(
                userId,
                `Редаговано колекцію ${collection.name}`
            );

            return {
                message: "Колекцію успішно оновлено",
                collection,
            };
        } catch (error) {
            console.error("Помилка редагування колекції:", error);
            throw new Error("Не вдалося оновити колекцію");
        }
    }

    async deleteCollection(userId: string, collectionId: string) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: { id: collectionId },
            });

            if (!collection) throw new Error("Колекцію не знайдено");

            await this.prisma.collection.delete({
                where: {
                    id: collectionId,
                },
            });

            await this.adminRecentActions.createAction(
                userId,
                `Видалено колекцію ${collection.name}`
            );

            return {
                message: "Колекцію успішно видалено",
            };
        } catch (error) {
            console.error("Помилка видалення колекції:", error);
            throw new Error("Не вдалося видалити колекцію");
        }
    }
}
