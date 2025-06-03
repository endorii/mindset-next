import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("upload/image")
export class AppController {
    @Post()
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./public/images",
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
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
    uploadCollectionImage(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException("Файл не надано");
        }

        const imagePath = `/images/${file.filename}`;
        return {
            message: "Зображення успішно завантажено",
            path: imagePath,
        };
    }
}
