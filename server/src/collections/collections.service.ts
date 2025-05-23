import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class CollectionsService {
    constructor(private prisma: PrismaService) {}

    getCollections() {
        return this.prisma.collection.findMany();
    }

    createCollection(name: string, path: string, banner: string) {
        return this.prisma.collection.create({
            data: {
                name,
                path,
                banner,
            },
        });
    }

    updateCollection(id: string, name: string, path: string, banner: string) {
        return this.prisma.collection.update({
            where: { id },
            data: {
                name,
                path,
                banner,
            },
        });
    }

    deleteCollection(id: string) {
        return this.prisma.collection.delete({
            where: { id },
        });
    }
}
