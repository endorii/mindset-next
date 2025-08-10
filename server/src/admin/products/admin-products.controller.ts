import { Controller, Body, Param, Post, Delete, Patch, UseGuards, Req } from "@nestjs/common";
import { AdminProductsService } from "./admin-products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("admin/products")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminProductsController {
    constructor(private readonly adminProductsService: AdminProductsService) {}

    @Post()
    @Roles(Role.ADMIN)
    postProduct(
        @Body() createProductDto: CreateProductDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminProductsService.postProduct(req.user.id, createProductDto);
    }

    @Patch(":productId")
    @Roles(Role.ADMIN)
    editProduct(
        @Param("productId") productId: string,
        @Body() updateProductDto: UpdateProductDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminProductsService.editProduct(req.user.id, productId, updateProductDto);
    }

    @Delete(":productId")
    @Roles(Role.ADMIN)
    deleteProduct(
        @Param("productId") productId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminProductsService.deleteProduct(req.user.id, productId);
    }
}
