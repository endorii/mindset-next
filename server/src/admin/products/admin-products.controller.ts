import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { AdminProductsService } from "./admin-products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("admin/products")
@UseGuards(JwtAccessGuard, RolesGuard)
export class AdminProductsController {
    constructor(private readonly adminProductsService: AdminProductsService) {}

    @Post()
    @Roles(Role.admin)
    postProduct(
        @Body() createProductDto: CreateProductDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminProductsService.postProduct(req.user.id, createProductDto);
    }

    @Patch(":productId")
    @Roles(Role.admin)
    editProduct(
        @Param("productId") productId: string,
        @Body() updateProductDto: UpdateProductDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminProductsService.editProduct(req.user.id, productId, updateProductDto);
    }

    @Delete(":productId")
    @Roles(Role.admin)
    deleteProduct(
        @Param("productId") productId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminProductsService.deleteProduct(req.user.id, productId);
    }
}
