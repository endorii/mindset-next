import { Controller, Get, Body, Param } from "@nestjs/common";
import { CollectionsService } from "./collections.service";
// import { CreateCollectionDto } from "./dto/create-collection.dto";

@Controller("collections")
export class CollectionsController {
    constructor(private readonly collectionsService: CollectionsService) {}

    @Get()
    getCollections() {
        return this.collectionsService.getCollections();
    }

    @Get(":collectionPath")
    getCollection(@Param("collectionPath") collectionPath: string) {
        return this.collectionsService.getCollection(collectionPath);
    }

    // @Post()
    // postCollection(@Body() createCollectionDto: CreateCollectionDto) {
    //     return this.collectionsService.postCollection(createCollectionDto);
    // }

    // @Delete(":id")
    // remove(@Param("id") id: string) {
    //     return this.collectionsService.deleteCollection(id);
    // }
}
