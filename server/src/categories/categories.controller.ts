import { Controller, Param, Get, Post, Body } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Controller("collections/:collectionPath/categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get(":categoryPath")
    getCategory(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string
    ) {
        return this.categoriesService.getCategory(collectionPath, categoryPath);
    }

    @Post()
    postCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.postCategory(createCategoryDto);
    }

    // @Delete(":id")
    // deleteCategory(@Param("id") id: string) {
    //     return this.categoriesService.deleteCategory(id);
    // }
}
