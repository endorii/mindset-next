import {
    BadRequestException,
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { CreateColorDto } from "./dto/create-color.dto";
import { UpdateColorDto } from "./dto/update-color.dto";

@Injectable()
export class AdminColorsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService
    ) {}

    async getColors() {
        try {
            const colors = await this.prisma.color.findMany();
            return colors;
        } catch (error) {
            console.error("Error fetching colors:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to fetch colors");
        }
    }

    async addColor(userId: string, createColorDto: CreateColorDto) {
        try {
            const existingColor = await this.prisma.color.findUnique({
                where: {
                    name: createColorDto.name,
                },
            });

            const existingHex = await this.prisma.color.findUnique({
                where: {
                    hexCode: createColorDto.hexCode,
                },
            });

            if (existingColor) {
                throw new ConflictException("A color with this name already exists");
            }

            if (existingHex) {
                throw new ConflictException("A color with this HEX code already exists");
            }

            const color = await this.prisma.color.create({
                data: createColorDto,
            });

            await this.adminRecentActions.createAction(userId, `Added color ${color.name}`);

            return {
                message: "Color successfully created",
                color,
            };
        } catch (error) {
            console.error("Error creating color:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("An internal server error occurred");
        }
    }

    async editColor(userId: string, colorId: string, updateColorDto: UpdateColorDto) {
        if (!updateColorDto || Object.keys(updateColorDto).length === 0) {
            throw new BadRequestException("No update data provided");
        }

        try {
            const color = await this.prisma.color.findUnique({
                where: { id: colorId },
            });

            if (!color) {
                throw new NotFoundException("Color with this ID not found");
            }

            const updatedColor = await this.prisma.color.update({
                where: { id: colorId },
                data: updateColorDto,
            });

            await this.adminRecentActions.createAction(userId, `Edited color ${updatedColor.name}`);

            return {
                message: "Color successfully updated",
                color: updatedColor,
            };
        } catch (error) {
            console.error("Error updating color:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("An internal server error occurred");
        }
    }

    async deleteColor(userId: string, colorId: string) {
        try {
            const color = await this.prisma.color.findUnique({
                where: { id: colorId },
            });

            if (!color) {
                throw new NotFoundException("Color with this ID not found");
            }

            await this.prisma.color.delete({
                where: { id: colorId },
            });

            await this.adminRecentActions.createAction(userId, `Deleted color ${color.name}`);

            return {
                message: "Color successfully deleted",
            };
        } catch (error) {
            console.error("Error deleting color:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("An internal server error occurred");
        }
    }
}
