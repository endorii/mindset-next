import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RevalidateService } from "src/revalidate/revalidate.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";

@Injectable()
export class AdminCollectionsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService,
        private readonly revalidateService: RevalidateService
    ) {}

    async postCollection(userId: string, createCollectionDto: CreateCollectionDto) {
        const { name, path, description, status } = createCollectionDto;

        const existingCollection = await this.prisma.collection.findUnique({
            where: { path },
        });

        if (existingCollection) {
            throw new ConflictException("A collection with this path already exists");
        }

        const collection = await this.prisma.collection.create({
            data: {
                name,
                path,
                description,
                status,
            },
        });

        await this.adminRecentActions.createAction(userId, `Added collection ${collection.name}`);

        await this.revalidateService.revalidate("/collections");

        return {
            message: "Collection successfully created",
            data: collection,
        };
    }

    async editCollection(
        userId: string,
        collectionId: string,
        updateCollectionDto: UpdateCollectionDto
    ) {
        const collection = await this.prisma.collection.findUnique({
            where: { id: collectionId },
        });

        if (!collection) {
            throw new NotFoundException("Collection with this ID not found");
        }

        if (updateCollectionDto.path && updateCollectionDto.path !== collection.path) {
            const existingCollection = await this.prisma.collection.findUnique({
                where: { path: updateCollectionDto.path },
            });

            if (existingCollection) {
                throw new ConflictException("A collection with this path already exists");
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
            `Edited collection ${updatedCollection.name}`
        );

        await this.revalidateService.revalidate("/collections");

        return {
            message: "Collection successfully updated",
            collection: updatedCollection,
        };
    }

    async deleteCollection(userId: string, collectionId: string) {
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
            throw new NotFoundException("Collection with this ID not found");
        }

        if (collection._count?.categories > 0) {
            throw new ConflictException(
                "Cannot delete a collection that contains categories. Remove all categories first."
            );
        }

        await this.prisma.collection.delete({
            where: {
                id: collectionId,
            },
        });

        await this.adminRecentActions.createAction(userId, `Deleted collection ${collection.name}`);

        await this.revalidateService.revalidate("/collections");

        return {
            message: "Collection successfully deleted",
        };
    }
}
