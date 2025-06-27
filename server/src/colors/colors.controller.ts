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
} from "@nestjs/common";
import { CreateColorDto } from "./dto/create-color.dto";
import { ColorsService } from "./colors.service";
import { UpdateColorDto } from "./dto/update-color.dto";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Public } from "src/auth/decorators/public.decorator";

@Controller("colors")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ColorsController {
    constructor(private readonly colorsService: ColorsService) {}

    @Post()
    @Roles(Role.ADMIN)
    addColor(@Body(new ValidationPipe()) createColorDto: CreateColorDto) {
        return this.colorsService.addColor(createColorDto);
    }

    @Get()
    @Public()
    getColors() {
        return this.colorsService.getColors();
    }

    @Patch(":colorId")
    @Roles(Role.ADMIN)
    editColor(@Param("colorId") colorId: string, @Body() updateColorDto: UpdateColorDto) {
        return this.colorsService.editColor(colorId, updateColorDto);
    }

    @Delete(":colorId")
    @Roles(Role.ADMIN)
    deleteColor(@Param("colorId") colorId: string) {
        return this.colorsService.deleteColor(colorId);
    }
}
