import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    ConflictException,
    HttpException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AdminCollectionsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService,
        private readonly configService: ConfigService
    ) {}

    async postCollection(userId: string, createCollectionDto: CreateCollectionDto) {
        const { name, path, description, banner, views, status } = createCollectionDto;

        try {
            const existingCollection = await this.prisma.collection.findUnique({
                where: { path },
            });

            if (existingCollection) {
                throw new ConflictException("Колекція з таким шляхом уже існує");
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

            const nextUrl = this.configService.get<string>("FRONTEND_URL");
            const secret = this.configService.get<string>("REVALIDATE_SECRET");

            await fetch(`${nextUrl}/api/revalidate?secret=${secret}&path=/collections`, {
                method: "GET",
            });

            return {
                message: "Колекцію успішно створено",
                collection,
            };
        } catch (error) {
            console.error("Помилка створення колекції:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося створити колекцію");
        }
    }

    async editCollection(
        userId: string,
        collectionId: string,
        updateCollectionDto: UpdateCollectionDto
    ) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: { id: collectionId },
            });

            if (!collection) {
                throw new NotFoundException("Колекцію з таким ID не знайдено");
            }

            if (updateCollectionDto.path && updateCollectionDto.path !== collection.path) {
                const existingCollection = await this.prisma.collection.findUnique({
                    where: { path: updateCollectionDto.path },
                });

                if (existingCollection) {
                    throw new ConflictException("Колекція з таким шляхом уже існує");
                }
            }

            const updatedCollection = await this.prisma.collection.update({
                where: {
                    id: collectionId,
                },
                data: updateCollectionDto,
            });

            await this.adminRecentActions.createAction(
                userId,
                `Редаговано колекцію ${updatedCollection.name}`
            );
            const nextUrl = this.configService.get<string>("FRONTEND_URL");
            const secret = this.configService.get<string>("REVALIDATE_SECRET");

            await fetch(`${nextUrl}/api/revalidate?secret=${secret}&path=/collections`, {
                method: "GET",
            });

            return {
                message: "Колекцію успішно оновлено",
                collection: updatedCollection,
            };
        } catch (error) {
            console.error("Помилка редагування колекції:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося оновити колекцію");
        }
    }

    async deleteCollection(userId: string, collectionId: string) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: { id: collectionId },
                include: {
                    _count: {
                        select: {
                            categories: true,
                        },
                    },
                },
            });

            if (!collection) {
                throw new NotFoundException("Колекцію з таким ID не знайдено");
            }

            if (collection._count?.categories > 0) {
                throw new ConflictException(
                    "Неможливо видалити колекцію, яка містить категорії. Спочатку видаліть усі категорії."
                );
            }

            await this.prisma.collection.delete({
                where: {
                    id: collectionId,
                },
            });

            await this.adminRecentActions.createAction(
                userId,
                `Видалено колекцію ${collection.name}`
            );
            const nextUrl = this.configService.get<string>("FRONTEND_URL");
            const secret = this.configService.get<string>("REVALIDATE_SECRET");

            await fetch(`${nextUrl}/api/revalidate?secret=${secret}&path=/collections`, {
                method: "GET",
            });

            return {
                message: "Колекцію успішно видалено",
            };
        } catch (error) {
            console.error("Помилка видалення колекції:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося видалити колекцію");
        }
    }
}
