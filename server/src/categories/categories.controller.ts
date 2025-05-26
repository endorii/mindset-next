import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Controller("categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get(":collectionId")
    getCategoriesFromCollection(@Param("collectionId") collectionId: string) {
        return this.categoriesService.getCategoriesFromCollection(collectionId);
    }

    @Post()
    postCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.postCategory(createCategoryDto);
    }

    @Delete(":id")
    deleteCategory(@Param("id") id: string) {
        return this.categoriesService.deleteCategory(id);
    }
}
