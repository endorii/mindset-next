import { Controller, Get, Post, Body, ValidationPipe, Delete, Param } from "@nestjs/common";
import { SizesService } from "./sizes.service";
import { CreateSizeDto } from "./dto/create-size.dto";
// import { UpdateSizeDto } from './dto/update-size.dto';

@Controller("sizes")
export class SizesController {
    constructor(private readonly sizesService: SizesService) {}

    @Post()
    addSize(@Body(new ValidationPipe()) createSizeDto: CreateSizeDto) {
        return this.sizesService.addSize(createSizeDto);
    }

    @Get()
    getSizes() {
        return this.sizesService.getSizes();
    }

    @Delete(":sizeId")
    deleteSize(@Param("sizeId") sizeId: string) {
        return this.sizesService.deleteSize(sizeId);
    }
}
