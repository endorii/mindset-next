import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { PrismaService } from "src/prisma/prisma.service";
import { SupabaseService } from "src/supabase/supabase.service";

type BannerEntity = "collection" | "category" | "product";
type ImagesEntity = "products" | "reviews";

@Injectable()
export class FilesService {
    constructor(
        private readonly supabase: SupabaseService,
        private readonly prisma: PrismaService
    ) {}

    private getBucket(type: BannerEntity | ImagesEntity, purpose: "banner" | "images") {
        if (purpose === "banner") return "banners";
        if (purpose === "images" && type === "products") return "products";
        if (purpose === "images" && type === "reviews") return "reviews";
        throw new Error("Invalid bucket mapping");
    }

    private getPath(type: BannerEntity | ImagesEntity, id: string, filename: string) {
        return `${type}s/${id}/${filename}`;
    }

    async uploadBanner(type: BannerEntity, id: string, file: Express.Multer.File) {
        const ext = file.originalname.split(".").pop();
        const filename = `${randomUUID()}.${ext}`;
        const bucket = this.getBucket(type, "banner");
        const path = this.getPath(type, id, filename);

        const url = await this.supabase.uploadFile(bucket, path, file);

        switch (type) {
            case "collection":
                await this.prisma.collection.update({
                    where: { id },
                    data: { banner: url },
                });
                break;
            case "category":
                await this.prisma.category.update({
                    where: { id },
                    data: { banner: url },
                });
                break;
            case "product":
                await this.prisma.product.update({
                    where: { id },
                    data: { banner: url },
                });
                break;
        }

        return { path: url };
    }

    async uploadMultipleFiles(type: ImagesEntity, id: string, files: Express.Multer.File[]) {
        const bucket = this.getBucket(type, "images");
        const urls: string[] = [];

        for (const file of files) {
            const ext = file.originalname.split(".").pop();
            const filename = `${randomUUID()}.${ext}`;
            const path = this.getPath(type, id, filename);

            const url = await this.supabase.uploadFile(bucket, path, file);
            urls.push(url);
        }

        if (type === "products") {
            await this.prisma.product.update({
                where: { id },
                data: { images: { push: urls } },
            });
        } else if (type === "reviews") {
            await this.prisma.review.update({
                where: { id },
                data: { images: { push: urls } },
            });
        }

        return { paths: urls };
    }

    async deleteFile(bucket: string, path: string) {
        return this.supabase.deleteFile(bucket, path);
    }
}
