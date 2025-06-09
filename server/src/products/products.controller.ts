import { Controller, Get, Body, Param, Post, Delete, Patch } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("collections/:collectionPath/categories/:categoryPath/products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get(":productPath")
    getProduct(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string,
        @Param("productPath") productPath: string
    ) {
        return this.productsService.getProduct(collectionPath, categoryPath, productPath);
    }

    @Post()
    postProduct(@Body() createProductDto: CreateProductDto) {
        return this.productsService.postProduct(createProductDto);
    }

    @Patch(":productPath")
    editProduct(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string,
        @Param("productPath") productPath: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productsService.editProduct(
            collectionPath,
            categoryPath,
            productPath,
            updateProductDto
        );
    }

    @Delete(":productPath")
    deleteProduct(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string,
        @Param("productPath") productPath: string
    ) {
        return this.productsService.deleteProduct(collectionPath, categoryPath, productPath);
    }
}
