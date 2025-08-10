import { Controller, Post, Body, Param, Patch, Delete, UseGuards, Req } from "@nestjs/common";

import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";

import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { Role } from "generated/prisma";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";
import { AdminCollectionsService } from "./admin-collections.service";

@Controller("admin/collections")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminCollectionsController {
    constructor(private readonly collectionsService: AdminCollectionsService) {}

    @Post()
    @Roles(Role.ADMIN)
    postCollection(
        @Body() createCollectionDto: CreateCollectionDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.collectionsService.postCollection(req.user.id, createCollectionDto);
    }

    @Patch(":collectionId")
    @Roles(Role.ADMIN)
    editCollection(
        @Param("collectionId") collectionId: string,
        @Body() updateCollectionDto: UpdateCollectionDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.collectionsService.editCollection(
            req.user.id,
            collectionId,
            updateCollectionDto
        );
    }

    @Delete(":collectionId")
    @Roles(Role.ADMIN)
    deleteCollection(
        @Param("collectionId") collectionId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.collectionsService.deleteCollection(req.user.id, collectionId);
    }
}
