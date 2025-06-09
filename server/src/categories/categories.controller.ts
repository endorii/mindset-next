import { Controller, Param, Get, Post, Body, Delete, Patch } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

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

    @Patch(":categoryPath")
    editCategory(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string,
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return this.categoriesService.editCategory(collectionPath, categoryPath, updateCategoryDto);
    }

    @Delete(":categoryPath")
    deleteCategory(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string
    ) {
        return this.categoriesService.deleteCategory(collectionPath, categoryPath);
    }
}
