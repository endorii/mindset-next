import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { AdminCategoriesService } from "./admin-categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("admin/categories")
@UseGuards(JwtAccessGuard, RolesGuard)
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
