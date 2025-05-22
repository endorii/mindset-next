import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("collections")
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getCollections() {
        return this.appService.getCollections();
    }

    @Post()
    createCollection(
        @Body("name") name: string,
        @Body("path") path: string,
        @Body("banner") banner: string
    ) {
        return this.appService.createCollection(name, path, banner);
    }

    @Put(":id")
    updateCollection(
        @Param("id") id: string,
        @Body("name") name: string,
        @Body("path") path: string,
        @Body("banner") banner: string
    ) {
        return this.appService.updateCollection(id, name, path, banner);
    }

    @Delete(":id")
    deleteUser(@Param("id") id: string) {
        return this.appService.deleteCollection(id);
    }
}
