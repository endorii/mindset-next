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
import { AdminSizesService } from "./admin-sizes.service";
import { CreateSizeDto } from "./dto/create-size.dto";
import { UpdateSizeDto } from "./dto/update-size.dto";

@Controller("admin/sizes")
@UseGuards(JwtAccessGuard, RolesGuard)
export class AdminSizesController {
    constructor(private readonly adminSizesService: AdminSizesService) {}

    @Get()
    @Roles(Role.admin)
    getSizes() {
        return this.adminSizesService.getSizes();
    }

    @Post()
    @Roles(Role.admin)
    addSize(
        @Body(new ValidationPipe()) createSizeDto: CreateSizeDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminSizesService.addSize(req.user.id, createSizeDto);
    }

    @Patch(":sizeId")
    @Roles(Role.admin)
    editSize(
        @Param("sizeId") sizeId: string,
        @Body() updateSizeDto: UpdateSizeDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminSizesService.editSize(req.user.id, sizeId, updateSizeDto);
    }

    @Delete(":sizeId")
    @Roles(Role.admin)
    deleteSize(
        @Param("sizeId") sizeId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminSizesService.deleteSize(req.user.id, sizeId);
    }
}
