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

    @Post()
    postCollection(@Body() createCollectionDto: CreateCollectionDto) {
        return this.collectionsService.postCollection(createCollectionDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.collectionsService.deleteCollection(id);
    }
}
