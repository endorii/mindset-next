import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";

import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";

import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { AdminCategoriesService } from "../categories/admin-categories.service";
import { AdminCollectionsService } from "./admin-collections.service";

@Controller("admin/collections")
@UseGuards(JwtAccessGuard, RolesGuard)
@Roles(Role.admin)
export class AdminCollectionsController {
    constructor(
        private readonly adminCollectionsService: AdminCollectionsService,
        private readonly adminCategoriesService: AdminCategoriesService
    ) {}

    @Get()
    getCollections() {
        return this.adminCollectionsService.getCollections();
    }

    @Post()
    postCollection(
        @Body() createCollectionDto: CreateCollectionDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminCollectionsService.postCollection(req.user.id, createCollectionDto);
    }

    @Get(":collectionId")
    getCollection(@Param("collectionId") collectionId: string) {
        return this.adminCollectionsService.getCollection(collectionId);
    }

    @Patch(":collectionId")
    editCollection(
        @Param("collectionId") collectionId: string,
        @Body() updateCollectionDto: UpdateCollectionDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminCollectionsService.editCollection(
            req.user.id,
            collectionId,
            updateCollectionDto
        );
    }

    @Delete(":collectionId")
    deleteCollection(
        @Param("collectionId") collectionId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.adminCollectionsService.deleteCollection(req.user.id, collectionId);
    }

    @Get(":collectionId/categories")
    getCollectionCategories(@Param("collectionId") collectionId: string) {
        return this.adminCategoriesService.getCollectionCategories(collectionId);
    }
}
