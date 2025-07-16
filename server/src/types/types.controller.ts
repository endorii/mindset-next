import { Controller, Get, Post, Body, Delete, Param, Patch, UseGuards, Req } from "@nestjs/common";
import { TypesService } from "./types.service";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { Public } from "src/auth/decorators/public.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("types")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TypesController {
    constructor(private readonly typesService: TypesService) {}

    @Post()
    @Roles(Role.ADMIN)
    addType(
        @Body() createTypeDto: CreateTypeDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.typesService.addType(req.user.id, createTypeDto);
    }

    @Get()
    @Public()
    getTypes() {
        return this.typesService.getTypes();
    }

    @Patch(":typeId")
    @Roles(Role.ADMIN)
    editType(
        @Param("typeId") typeId: string,
        @Body() updatTypeDto: UpdateTypeDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.typesService.editType(req.user.id, typeId, updatTypeDto);
    }

    @Delete(":typeId")
    @Roles(Role.ADMIN)
    deleteType(
        @Param("typeId") typeId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.typesService.deleteType(req.user.id, typeId);
    }
}
