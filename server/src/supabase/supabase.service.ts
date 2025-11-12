import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
    private supabase: ReturnType<typeof createClient>;

    constructor(private readonly configService: ConfigService) {
        const url = this.configService.get<string>("SUPABASE_URL");
        const key = this.configService.get<string>("SUPABASE_SERVICE_KEY");
        if (!url || !key) throw new Error("Supabase credentials not set");
        this.supabase = createClient(url, key);
    }

    async uploadFile(bucket: string, path: string, file: Express.Multer.File): Promise<string> {
        const { error } = await this.supabase.storage.from(bucket).upload(path, file.buffer, {
            cacheControl: "3600",
            upsert: true,
            contentType: file.mimetype,
        });

        if (error) {
            throw new Error(`Supabase upload error: ${error.message}`);
        }

        const { data } = this.supabase.storage.from(bucket).getPublicUrl(path);
        return data.publicUrl;
    }

    async deleteFile(bucket: string, path: string) {
        const { error } = await this.supabase.storage.from(bucket).remove([path]);
        if (error) {
            throw new Error(`Supabase delete error: ${error.message}`);
        }
        return true;
    }

    //  Опційно: створення signed URL

    async getSignedUrl(bucket: string, path: string, expiresIn: number = 3600) {
        const { data, error } = await this.supabase.storage
            .from(bucket)
            .createSignedUrl(path, expiresIn);
        if (error) throw new Error(`Supabase signed URL error: ${error.message}`);
        return data.signedUrl;
    }
}
