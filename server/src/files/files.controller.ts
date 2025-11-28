import {
    BadRequestException,
    Controller,
    Param,
    Post,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { FilesService } from "./files.service";

@Controller("files")
@UseGuards(RolesGuard)
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post("upload/:type/banner/:id")
    @Roles(Role.admin)
    @UseInterceptors(FileInterceptor("banner"))
    async uploadBanner(
        @Param("type") type: "collection" | "category" | "product",
        @Param("id") id: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!file) throw new BadRequestException("File is required");

        return this.filesService.uploadBanner(type, id, file);
    }

    @Post("upload/:type/images/:id")
    @Roles(Role.admin)
    @UseInterceptors(FilesInterceptor("images"))
    async uploadImages(
        @Param("type") type: "products" | "reviews",
        @Param("id") id: string,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        if (!files || files.length === 0) throw new BadRequestException("No files provided");

        return this.filesService.uploadMultipleFiles(type, id, files);
    }
}
