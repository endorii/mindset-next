import {
    BadRequestException,
    ConflictException,
    Injectable,
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
        return this.prisma.color.findMany();
    }

    async addColor(userId: string, createColorDto: CreateColorDto) {
        const existingColor = await this.prisma.color.findUnique({
            where: { name: createColorDto.name },
        });

        if (existingColor) {
            throw new ConflictException("A color with this name already exists");
        }

        const existingHex = await this.prisma.color.findUnique({
            where: { hexCode: createColorDto.hexCode },
        });

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
    }

    async editColor(userId: string, colorId: string, updateColorDto: UpdateColorDto) {
        if (!updateColorDto || Object.keys(updateColorDto).length === 0) {
            throw new BadRequestException("No update data provided");
        }

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
    }

    async deleteColor(userId: string, colorId: string) {
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
    }
}
