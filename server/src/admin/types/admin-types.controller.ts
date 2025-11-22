import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { AdminTypesService } from "./admin-types.service";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";

@Controller("admin/types")
@UseGuards(JwtAccessGuard, RolesGuard)
export class AdminTypesController {
    constructor(private readonly adminTypesService: AdminTypesService) {}

    @Get()
    @Roles(Role.admin)
    getTypes() {
        return this.adminTypesService.getTypes();
    }

    @Post()
    @Roles(Role.admin)
    addType(
        @Body() createTypeDto: CreateTypeDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminTypesService.addType(req.user.id, createTypeDto);
    }

    @Patch(":typeId")
    @Roles(Role.admin)
    editType(
        @Param("typeId") typeId: string,
        @Body() updatTypeDto: UpdateTypeDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminTypesService.editType(req.user.id, typeId, updatTypeDto);
    }

    @Delete(":typeId")
    @Roles(Role.admin)
    deleteType(
        @Param("typeId") typeId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminTypesService.deleteType(req.user.id, typeId);
    }
}
