import {
    Controller,
    Get,
    Post,
    Body,
    ValidationPipe,
    Delete,
    Param,
    Patch,
    UseGuards,
    Req,
} from "@nestjs/common";
import { AdminSizesService } from "./sizes.service";
import { CreateSizeDto } from "./dto/create-size.dto";
import { UpdateSizeDto } from "./dto/update-size.dto";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("admin/sizes")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminSizesController {
    constructor(private readonly adminSizesService: AdminSizesService) {}

    @Get()
    @Roles(Role.ADMIN)
    getSizes() {
        return this.adminSizesService.getSizes();
    }

    @Post()
    @Roles(Role.ADMIN)
    addSize(
        @Body(new ValidationPipe()) createSizeDto: CreateSizeDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminSizesService.addSize(req.user.id, createSizeDto);
    }

    @Patch(":sizeId")
    @Roles(Role.ADMIN)
    editSize(
        @Param("sizeId") sizeId: string,
        @Body() updateSizeDto: UpdateSizeDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminSizesService.editSize(req.user.id, sizeId, updateSizeDto);
    }

    @Delete(":sizeId")
    @Roles(Role.ADMIN)
    deleteSize(
        @Param("sizeId") sizeId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminSizesService.deleteSize(req.user.id, sizeId);
    }
}
