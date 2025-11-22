import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";

import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";

import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { AdminCollectionsService } from "./admin-collections.service";

@Controller("admin/collections")
@UseGuards(JwtAccessGuard, RolesGuard)
export class AdminCollectionsController {
    constructor(private readonly collectionsService: AdminCollectionsService) {}

    @Post()
    @Roles(Role.admin)
    postCollection(
        @Body() createCollectionDto: CreateCollectionDto,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.collectionsService.postCollection(req.user.id, createCollectionDto);
    }

    @Patch(":collectionId")
    @Roles(Role.admin)
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
    @Roles(Role.admin)
    deleteCollection(
        @Param("collectionId") collectionId: string,
        @Req() req: Request & { user: AuthenticatedRequestUser }
    ) {
        return this.collectionsService.deleteCollection(req.user.id, collectionId);
    }
}
