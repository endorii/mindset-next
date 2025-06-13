import { Controller, Post, Body, ValidationPipe, Get, Param, Delete, Patch } from "@nestjs/common";
import { CreateColorDto } from "./dto/create-color.dto";
import { ColorsService } from "./colors.service";
import { UpdateColorDto } from "./dto/update-color.dto";

@Controller("colors")
export class ColorsController {
    constructor(private readonly colorsService: ColorsService) {}

    @Post()
    addColor(@Body(new ValidationPipe()) createColorDto: CreateColorDto) {
        return this.colorsService.addColor(createColorDto);
    }

    @Get()
    getColors() {
        return this.colorsService.getColors();
    }

    @Patch(":colorId")
    editColor(@Param("colorId") colorId: string, @Body() updateColorDto: UpdateColorDto) {
        return this.colorsService.editColor(colorId, updateColorDto);
    }

    @Delete(":colorId")
    deleteColor(@Param("colorId") colorId: string) {
        return this.colorsService.deleteColor(colorId);
    }
}
