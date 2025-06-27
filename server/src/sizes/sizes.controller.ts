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
} from "@nestjs/common";
import { SizesService } from "./sizes.service";
import { CreateSizeDto } from "./dto/create-size.dto";
import { UpdateSizeDto } from "./dto/update-size.dto";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { Public } from "src/auth/decorators/public.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";

@Controller("sizes")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SizesController {
    constructor(private readonly sizesService: SizesService) {}

    @Post()
    @Roles(Role.ADMIN)
    addSize(@Body(new ValidationPipe()) createSizeDto: CreateSizeDto) {
        return this.sizesService.addSize(createSizeDto);
    }

    @Get()
    @Public()
    getSizes() {
        return this.sizesService.getSizes();
    }

    @Patch(":sizeId")
    @Roles(Role.ADMIN)
    editSize(@Param("sizeId") sizeId: string, @Body() updateSizeDto: UpdateSizeDto) {
        return this.sizesService.editSize(sizeId, updateSizeDto);
    }

    @Delete(":sizeId")
    @Roles(Role.ADMIN)
    deleteSize(@Param("sizeId") sizeId: string) {
        return this.sizesService.deleteSize(sizeId);
    }
}
