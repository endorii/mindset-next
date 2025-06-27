import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from "@nestjs/common";

import { CollectionsService } from "./collections.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";
import { Public } from "src/auth/decorators/public.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { Role } from "generated/prisma";

@Controller("collections")
@UseGuards(JwtAuthGuard, RolesGuard)
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
    @Roles(Role.ADMIN)
    postCollection(@Body() createCollectionDto: CreateCollectionDto) {
        return this.collectionsService.postCollection(createCollectionDto);
    }

    @Patch(":collectionPath")
    @Roles(Role.ADMIN)
    editCollection(
        @Param("collectionPath") collectionPath: string,
        @Body() updateCollectionDto: UpdateCollectionDto
    ) {
        return this.collectionsService.editCollection(collectionPath, updateCollectionDto);
    }

    @Delete(":collectionPath")
    @Roles(Role.ADMIN)
    deleteCollection(@Param("collectionPath") collectionPath: string) {
        return this.collectionsService.deleteCollection(collectionPath);
    }
}
