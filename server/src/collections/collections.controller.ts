import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { CollectionsService } from "./collections.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";

@Controller("collections")
export class CollectionsController {
    constructor(private readonly collectionsService: CollectionsService) {}

    @Get()
    getAllCollections() {
        return this.collectionsService.getAllCollections();
    }

    @Get(":collectionPath")
    getCategoriesFromCollectionPath(@Param("collectionPath") collectionPath: string) {
        return this.collectionsService.getCategoriesFromCollectionPath(collectionPath);
    }

    @Post()
    postCollection(@Body() createCollectionDto: CreateCollectionDto) {
        return this.collectionsService.postCollection(createCollectionDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.collectionsService.deleteCollection(id);
    }
}
