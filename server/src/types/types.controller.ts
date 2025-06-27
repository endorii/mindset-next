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
import { TypesService } from "./types.service";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { Public } from "src/auth/decorators/public.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";

@Controller("types")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TypesController {
    constructor(private readonly typesService: TypesService) {}

    @Post()
    @Roles(Role.ADMIN)
    addType(@Body(new ValidationPipe()) createTypeDto: CreateTypeDto) {
        return this.typesService.addType(createTypeDto);
    }

    @Get()
    @Public()
    getTypes() {
        return this.typesService.getTypes();
    }

    @Patch(":typeId")
    @Roles(Role.ADMIN)
    editType(@Param("typeId") typeId: string, @Body() updatTypeDto: UpdateTypeDto) {
        return this.typesService.editType(typeId, updatTypeDto);
    }

    @Delete(":typeId")
    @Roles(Role.ADMIN)
    deleteType(@Param("typeId") typeId: string) {
        return this.typesService.deleteType(typeId);
    }
}
