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
// import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { FilesService } from "./files.service";

@Controller("files")
@UseGuards(RolesGuard)
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post("upload/:type/banner/:id")
    @Roles(Role.ADMIN)
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
    @Roles(Role.ADMIN)
    @UseInterceptors(FilesInterceptor("images"))
    async uploadImages(
        @Param("type") type: "products" | "reviews",
        @Param("id") id: string,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        if (!files || files.length === 0) throw new BadRequestException("No files provided");

        return this.filesService.uploadMultipleFiles(type, id, files);
    }

    // @Delete("image")
    // @Roles(Role.ADMIN)
    // deleteImage(@Query("path") imagePath: string) {
    //     if (!imagePath) {
    //         throw new BadRequestException("Шлях до зображення не вказано");
    //     }

    //     const cleanedPath = imagePath.replace(/^\/+/, "");
    //     const fullPath = path.join(process.cwd(), "public", cleanedPath);

    //     if (fs.existsSync(fullPath)) {
    //         fs.unlinkSync(fullPath);
    //         return { message: "Зображення видалено" };
    //     } else {
    //         throw new NotFoundException("Файл не знайдено");
    //     }
    // }

    // @Delete("images")
    // @Roles(Role.ADMIN)
    // deleteImages(@Body() body: { paths: string[] }) {
    //     if (!body.paths || !Array.isArray(body.paths) || body.paths.length === 0) {
    //         throw new BadRequestException("Масив шляхів зображень не вказано або порожній");
    //     }

    //     const results: { path: string; status: string }[] = [];

    //     for (const imagePath of body.paths) {
    //         try {
    //             const cleanedPath = imagePath.replace(/^\/+/, "");
    //             const fullPath = path.join(process.cwd(), "public", cleanedPath);

    //             if (fs.existsSync(fullPath)) {
    //                 fs.unlinkSync(fullPath);
    //                 results.push({ path: imagePath, status: "deleted" });
    //             } else {
    //                 results.push({ path: imagePath, status: "not_found" });
    //             }
    //         } catch (e) {
    //             console.log(e);
    //             results.push({ path: imagePath, status: "error" });
    //         }
    //     }

    //     return { message: "Обробка масового видалення завершена", results };
    // }
}
