import { Controller, Get, Post, Body, ValidationPipe, Delete, Param, Patch } from "@nestjs/common";
import { TypesService } from "./types.service";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";

@Controller("types")
export class TypesController {
    constructor(private readonly typesService: TypesService) {}

    @Post()
    addType(@Body(new ValidationPipe()) createTypeDto: CreateTypeDto) {
        return this.typesService.addType(createTypeDto);
    }

    @Get()
    getTypes() {
        return this.typesService.getTypes();
    }

    @Patch(":typeId")
    editType(@Param("typeId") typeId: string, @Body() updatTypeDto: UpdateTypeDto) {
        return this.typesService.editType(typeId, updatTypeDto);
    }

    @Delete(":typeId")
    deleteType(@Param("typeId") typeId: string) {
        return this.typesService.deleteType(typeId);
    }
}
