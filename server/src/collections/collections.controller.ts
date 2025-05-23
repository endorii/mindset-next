import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CollectionsService } from "./collections.service";

@Controller("api/collections")
export class CollectionsController {
    constructor(private readonly collectionsService: CollectionsService) {}

    @Get()
    getCollections() {
        return this.collectionsService.getCollections();
    }

    @Post()
    createCollection(
        @Body("name") name: string,
        @Body("path") path: string,
        @Body("banner") banner: string
    ) {
        return this.collectionsService.createCollection(name, path, banner);
    }

    @Put(":id")
    updateCollection(
        @Param("id") id: string,
        @Body("name") name: string,
        @Body("path") path: string,
        @Body("banner") banner: string
    ) {
        return this.collectionsService.updateCollection(id, name, path, banner);
    }

    @Delete(":id")
    deleteUser(@Param("id") id: string) {
        return this.collectionsService.deleteCollection(id);
    }
}
