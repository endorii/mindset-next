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
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";
import * as path from "path";
import { imageFileFilter, imageStorage } from "src/multer.config";

@Controller("upload")
export class ImagesController {
    @Post("image")
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
    @UseInterceptors(
        FilesInterceptor("file", 10, {
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
}
