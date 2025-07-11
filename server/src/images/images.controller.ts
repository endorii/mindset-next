import {
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
    BadRequestException,
    Delete,
    Query,
    NotFoundException,
    Body,
    UseGuards,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";
import { Role } from "generated/prisma";
import * as path from "path";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { imageFileFilter, imageStorage } from "src/multer.config";

@Controller("upload")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ImagesController {
    @Post("image")
    @Roles(Role.ADMIN)
    @UseInterceptors(
        FileInterceptor("file", {
            storage: imageStorage,
            fileFilter: imageFileFilter,
        })
    )
    uploadSingleImage(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException("Файл не надано");
        }
        return {
            message: "Зображення успішно завантажено",
            path: `/images/${file.filename}`,
        };
    }

    @Post("images")
    @Roles(Role.ADMIN)
    @UseInterceptors(
        FilesInterceptor("files", 10, {
            storage: imageStorage,
            fileFilter: imageFileFilter,
        })
    )
    uploadMultipleImages(@UploadedFiles() files: Express.Multer.File[]) {
        if (!files || files.length === 0) {
            throw new BadRequestException("Файли не надано");
        }
        const paths = files.map((file) => `/images/${file.filename}`);
        return {
            message: "Зображення успішно завантажено",
            paths,
        };
    }

    @Delete("image")
    @Roles(Role.ADMIN)
    deleteImage(@Query("path") imagePath: string) {
        if (!imagePath) {
            throw new BadRequestException("Шлях до зображення не вказано");
        }

        const cleanedPath = imagePath.replace(/^\/+/, "");
        const fullPath = path.join(process.cwd(), "public", cleanedPath);

        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            return { message: "Зображення видалено" };
        } else {
            throw new NotFoundException("Файл не знайдено");
        }
    }

    @Delete("images")
    @Roles(Role.ADMIN)
    deleteImages(@Body() body: { paths: string[] }) {
        if (!body.paths || !Array.isArray(body.paths) || body.paths.length === 0) {
            throw new BadRequestException("Масив шляхів зображень не вказано або порожній");
        }

        const results: { path: string; status: string }[] = [];

        for (const imagePath of body.paths) {
            try {
                const cleanedPath = imagePath.replace(/^\/+/, "");
                const fullPath = path.join(process.cwd(), "public", cleanedPath);

                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                    results.push({ path: imagePath, status: "deleted" });
                } else {
                    results.push({ path: imagePath, status: "not_found" });
                }
            } catch (e) {
                console.log(e);
                results.push({ path: imagePath, status: "error" });
            }
        }

        return { message: "Обробка масового видалення завершена", results };
    }
}
