import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    Get,
    Param,
    Delete,
    Patch,
    UseGuards,
    Req,
} from "@nestjs/common";
import { CreateColorDto } from "./dto/create-color.dto";
import { AdminColorsService } from "./admin-colors.service";
import { UpdateColorDto } from "./dto/update-color.dto";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("admin/colors")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminColorsController {
    constructor(private readonly adminColorsService: AdminColorsService) {}

    @Get()
    @Roles(Role.ADMIN)
    getColors() {
        return this.adminColorsService.getColors();
    }

    @Post()
    @Roles(Role.ADMIN)
    addColor(
        @Body(new ValidationPipe()) createColorDto: CreateColorDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminColorsService.addColor(req.user.id, createColorDto);
    }

    @Patch(":colorId")
    @Roles(Role.ADMIN)
    editColor(
        @Param("colorId") colorId: string,
        @Body() updateColorDto: UpdateColorDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminColorsService.editColor(req.user.id, colorId, updateColorDto);
    }

    @Delete(":colorId")
    @Roles(Role.ADMIN)
    deleteColor(
        @Param("colorId") colorId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminColorsService.deleteColor(req.user.id, colorId);
    }
}
