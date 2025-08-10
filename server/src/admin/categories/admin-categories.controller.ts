import { Controller, Param, Post, Body, Delete, Patch, UseGuards, Req } from "@nestjs/common";
import { AdminCategoriesService } from "./admin-categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("admin/categories")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminCategoriesController {
    constructor(private readonly categoriesService: AdminCategoriesService) {}

    @Post()
    @Roles(Role.ADMIN)
    postCategory(
        @Body() createCategoryDto: CreateCategoryDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.categoriesService.postCategory(req.user.id, createCategoryDto);
    }

    @Patch(":categoryId")
    @Roles(Role.ADMIN)
    editCategory(
        @Param("categoryId") categoryId: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.categoriesService.editCategory(req.user.id, categoryId, updateCategoryDto);
    }

    @Delete(":categoryId")
    @Roles(Role.ADMIN)
    deleteCategory(
        @Param("categoryId") categoryId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.categoriesService.deleteCategory(req.user.id, categoryId);
    }
}
