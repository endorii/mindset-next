import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
    ValidationPipe,
} from "@nestjs/common";
import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { AdminColorsService } from "./admin-colors.service";
import { CreateColorDto } from "./dto/create-color.dto";
import { UpdateColorDto } from "./dto/update-color.dto";

@Controller("admin/colors")
@UseGuards(JwtAccessGuard, RolesGuard)
export class AdminColorsController {
    constructor(private readonly adminColorsService: AdminColorsService) {}

    @Get()
    @Roles(Role.admin)
    getColors() {
        return this.adminColorsService.getColors();
    }

    @Post()
    @Roles(Role.admin)
    addColor(
        @Body(new ValidationPipe()) createColorDto: CreateColorDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminColorsService.addColor(req.user.id, createColorDto);
    }

    @Patch(":colorId")
    @Roles(Role.admin)
    editColor(
        @Param("colorId") colorId: string,
        @Body() updateColorDto: UpdateColorDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminColorsService.editColor(req.user.id, colorId, updateColorDto);
    }

    @Delete(":colorId")
    @Roles(Role.admin)
    deleteColor(
        @Param("colorId") colorId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminColorsService.deleteColor(req.user.id, colorId);
    }
}
