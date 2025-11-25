import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { CreateSizeDto } from "./dto/create-size.dto";
import { UpdateSizeDto } from "./dto/update-size.dto";

@Injectable()
export class AdminSizesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService
    ) {}

    async getSizes() {
        const sizes = await this.prisma.size.findMany();
        return sizes;
    }

    async addSize(userId: string, createSizeDto: CreateSizeDto) {
        const { name } = createSizeDto;

        const existingSize = await this.prisma.size.findUnique({
            where: { name },
        });

        if (existingSize) {
            throw new ConflictException("Size with this name already exists");
        }

        const size = await this.prisma.size.create({
            data: { name },
        });

        await this.adminRecentActions.createAction(userId, `Added size ${size.name}`);

        return {
            message: "Size successfully created",
            size,
        };
    }

    async editSize(userId: string, sizeId: string, updateSizeDto: UpdateSizeDto) {
        const size = await this.prisma.size.findUnique({
            where: { id: sizeId },
        });

        if (!size) {
            throw new NotFoundException(`Size with ID ${sizeId} not found`);
        }

        const existingSize = await this.prisma.size.findUnique({
            where: { name: updateSizeDto.name },
        });

        if (existingSize && existingSize.id !== sizeId) {
            throw new ConflictException("Size with this name already exists");
        }

        const updatedSize = await this.prisma.size.update({
            where: { id: sizeId },
            data: updateSizeDto,
        });

        await this.adminRecentActions.createAction(userId, `Edited size ${updatedSize.name}`);

        return {
            message: "Size successfully updated",
            size: updatedSize,
        };
    }

    async deleteSize(userId: string, sizeId: string) {
        const size = await this.prisma.size.findUnique({
            where: { id: sizeId },
        });

        if (!size) {
            throw new NotFoundException(`Size with ID ${sizeId} not found`);
        }

        await this.prisma.size.delete({
            where: { id: sizeId },
        });

        await this.adminRecentActions.createAction(userId, `Deleted size ${size.name}`);

        return {
            message: "Size deleted",
        };
    }
}
