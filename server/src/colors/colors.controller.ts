import { Controller, Post, Body, ValidationPipe, Get, Param, Delete } from "@nestjs/common";
import { CreateColorDto } from "./dto/create-color.dto";
import { ColorsService } from "./colors.service";

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

    // @Get(":id")
    // findOne(@Param("id") id: string) {
    //     return this.colorsService.findOne(+id);
    // }

    // @Patch(":id")
    // update(@Param("id") id: string, @Body() updateColorDto: UpdateColorDto) {
    //     return this.colorsService.update(+id, updateColorDto);
    // }

    @Delete(":colorId")
    deleteColor(@Param("colorId") colorId: string) {
        return this.colorsService.deleteColor(colorId);
    }
}
