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
import { diskStorage } from "multer";
import * as fs from "fs";
import * as path from "path";

@Controller("upload")
export class AppController {
    @Post("image")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./public/images",
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                    const ext = path.extname(file.originalname);
                    cb(null, `${uniqueSuffix}${ext}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
                if (allowedTypes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new Error("Дозволені тільки зображення!"), false);
                }
            },
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

    @Delete("image")
    deleteImage(@Query("path") imagePath: string) {
        if (!imagePath) {
            throw new BadRequestException("Шлях до зображення не вказано");
        }

        const fullPath = path.join(__dirname, "..", "public", imagePath.replace(/^\/+/, ""));

        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            return { message: "Зображення видалено" };
        } else {
            throw new NotFoundException("Файл не знайдено");
        }
    }

    @Post("images")
    @UseInterceptors(
        FilesInterceptor("files", 10, {
            storage: diskStorage({
                destination: "./public/images",
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                    const ext = path.extname(file.originalname);
                    cb(null, `${uniqueSuffix}${ext}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
                if (allowedTypes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new Error("Дозволені тільки зображення!"), false);
                }
            },
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
}
