import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";

@Injectable()
export class AdminTypesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService
    ) {}

    async getTypes() {
        const types = await this.prisma.type.findMany();
        return types;
    }

    async addType(userId: string, createTypeDto: CreateTypeDto) {
        const { name } = createTypeDto;

        const existingType = await this.prisma.type.findUnique({
            where: { name },
        });

        if (existingType) {
            throw new ConflictException("Type with this name already exists");
        }

        const type = await this.prisma.type.create({
            data: { name },
        });

        await this.adminRecentActions.createAction(userId, `Added type ${type.name}`);

        return {
            message: "Type successfully created",
            type,
        };
    }

    async editType(userId: string, typeId: string, updateTypeDto: UpdateTypeDto) {
        const { name } = updateTypeDto;

        const type = await this.prisma.type.findUnique({
            where: { id: typeId },
        });

        if (!type) {
            throw new NotFoundException(`Type with ID ${typeId} not found`);
        }

        const existingType = await this.prisma.type.findUnique({
            where: { name },
        });

        if (existingType && existingType.id !== typeId) {
            throw new ConflictException("Type with this name already exists");
        }

        const updatedType = await this.prisma.type.update({
            where: { id: typeId },
            data: updateTypeDto,
        });

        await this.adminRecentActions.createAction(userId, `Edited type ${name}`);

        return {
            message: "Type successfully updated",
            type: updatedType,
        };
    }

    async deleteType(userId: string, typeId: string) {
        const type = await this.prisma.type.findUnique({
            where: { id: typeId },
        });

        if (!type) {
            throw new NotFoundException(`Type with ID ${typeId} not found`);
        }

        await this.prisma.type.delete({
            where: { id: typeId },
        });

        await this.adminRecentActions.createAction(userId, `Deleted type ${type.name}`);

        return {
            message: "Type successfully deleted",
        };
    }
}
