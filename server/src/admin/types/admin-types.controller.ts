import { Controller, Get, Post, Body, Delete, Param, Patch, UseGuards, Req } from "@nestjs/common";
import { AdminTypesService } from "./admin-types.service";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("admin/types")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminTypesController {
    constructor(private readonly adminTypesService: AdminTypesService) {}

    @Get()
    @Roles(Role.ADMIN)
    getTypes() {
        return this.adminTypesService.getTypes();
    }

    @Post()
    @Roles(Role.ADMIN)
    addType(
        @Body() createTypeDto: CreateTypeDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminTypesService.addType(req.user.id, createTypeDto);
    }

    @Patch(":typeId")
    @Roles(Role.ADMIN)
    editType(
        @Param("typeId") typeId: string,
        @Body() updatTypeDto: UpdateTypeDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminTypesService.editType(req.user.id, typeId, updatTypeDto);
    }

    @Delete(":typeId")
    @Roles(Role.ADMIN)
    deleteType(
        @Param("typeId") typeId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminTypesService.deleteType(req.user.id, typeId);
    }
}
