import { diskStorage, FileFilterCallback, StorageEngine } from "multer";
import { Request } from "express";
import * as path from "path";
import * as fs from "fs";

const uploadPath = path.join(__dirname, "..", "public", "images");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

export const imageStorage: StorageEngine = diskStorage({
    destination: uploadPath,
    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
    ): void => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    },
});

export const imageFileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
): void => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Дозволені тільки зображення!"));
    }
};
