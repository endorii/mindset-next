import { Controller, Get, Body, Param, Post, Delete, Patch, UseGuards, Req } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Public } from "src/auth/decorators/public.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("collections/:collectionPath/categories/:categoryPath/products")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get(":productPath")
    @Public()
    getProduct(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string,
        @Param("productPath") productPath: string
    ) {
        return this.productsService.getProduct(collectionPath, categoryPath, productPath);
    }

    @Post()
    @Roles(Role.ADMIN)
    postProduct(
        @Body() createProductDto: CreateProductDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.productsService.postProduct(req.user.id, createProductDto);
    }

    @Patch(":productPath")
    @Roles(Role.ADMIN)
    editProduct(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string,
        @Param("productPath") productPath: string,
        @Body() updateProductDto: UpdateProductDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.productsService.editProduct(
            req.user.id,
            collectionPath,
            categoryPath,
            productPath,
            updateProductDto
        );
    }

    @Delete(":productPath")
    @Roles(Role.ADMIN)
    deleteProduct(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string,
        @Param("productPath") productPath: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.productsService.deleteProduct(
            req.user.id,
            collectionPath,
            categoryPath,
            productPath
        );
    }
}
