import { Controller, Get, Post, Body, Param, Patch, Delete } from "@nestjs/common";

import { CollectionsService } from "./collections.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";
import { Public } from "src/auth/decorators/public.decorator";

@Controller("collections")
export class CollectionsController {
    constructor(private readonly collectionsService: CollectionsService) {}

    @Public()
    @Get()
    getCollections() {
        return this.collectionsService.getCollections();
    }

    @Public()
    @Get(":collectionPath")
    getCollection(@Param("collectionPath") collectionPath: string) {
        return this.collectionsService.getCollection(collectionPath);
    }

    @Post()
    postCollection(@Body() createCollectionDto: CreateCollectionDto) {
        return this.collectionsService.postCollection(createCollectionDto);
    }

    @Patch(":collectionPath")
    editCollection(
        @Param("collectionPath") collectionPath: string,
        @Body() updateCollectionDto: UpdateCollectionDto
    ) {
        return this.collectionsService.editCollection(collectionPath, updateCollectionDto);
    }

    @Delete(":collectionPath")
    deleteCollection(@Param("collectionPath") collectionPath: string) {
        return this.collectionsService.deleteCollection(collectionPath);
    }
}
