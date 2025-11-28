import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { AdminProductsService } from "../products/admin-products.service";
import { AdminCategoriesService } from "./admin-categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("admin/categories")
@UseGuards(JwtAccessGuard, RolesGuard)
@Roles(Role.admin)
export class AdminCategoriesController {
    constructor(
        private readonly adminCategoriesService: AdminCategoriesService,
        private readonly adminProductsService: AdminProductsService
    ) {}

    @Post()
    postCategory(
        @Body() createCategoryDto: CreateCategoryDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminCategoriesService.postCategory(req.user.id, createCategoryDto);
    }

    @Get(":categoryId")
    getCategory(@Param("categoryId") categoryId: string) {
        return this.adminCategoriesService.getCategory(categoryId);
    }

    @Patch(":categoryId")
    editCategory(
        @Param("categoryId") categoryId: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminCategoriesService.editCategory(req.user.id, categoryId, updateCategoryDto);
    }

    @Delete(":categoryId")
    deleteCategory(
        @Param("categoryId") categoryId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminCategoriesService.deleteCategory(req.user.id, categoryId);
    }

    @Get(":categoryId/products")
    getCategoryProducts(@Param("categoryId") categoryId: string) {
        return this.adminProductsService.getCategoryProducts(categoryId);
    }
}
