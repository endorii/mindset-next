import { Controller, Param, Get, Post, Body, Delete, Patch, UseGuards, Req } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Public } from "src/auth/decorators/public.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("collections/:collectionPath/categories")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get(":categoryPath")
    @Public()
    getCategory(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string
    ) {
        return this.categoriesService.getCategory(collectionPath, categoryPath);
    }

    @Post()
    @Roles(Role.ADMIN)
    postCategory(
        @Body() createCategoryDto: CreateCategoryDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.categoriesService.postCategory(req.user.id, createCategoryDto);
    }

    @Patch(":categoryPath")
    @Roles(Role.ADMIN)
    editCategory(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.categoriesService.editCategory(
            req.user.id,
            collectionPath,
            categoryPath,
            updateCategoryDto
        );
    }

    @Delete(":categoryPath")
    @Roles(Role.ADMIN)
    deleteCategory(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.categoriesService.deleteCategory(req.user.id, collectionPath, categoryPath);
    }
}
