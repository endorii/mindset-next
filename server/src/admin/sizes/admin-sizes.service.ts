import {
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
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
        try {
            const sizes = await this.prisma.size.findMany();
            return sizes;
        } catch (error: unknown) {
            console.error("Error fetching sizes:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to fetch sizes");
        }
    }

    async addSize(userId: string, createSizeDto: CreateSizeDto) {
        try {
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
        } catch (error: unknown) {
            console.error("Error creating size:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to create size");
        }
    }

    async editSize(userId: string, sizeId: string, updateSizeDto: UpdateSizeDto) {
        try {
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
        } catch (error: unknown) {
            console.error("Error editing size:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to update size");
        }
    }

    async deleteSize(userId: string, sizeId: string) {
        try {
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
        } catch (error: unknown) {
            console.error("Error deleting size:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to delete size");
        }
    }
}
