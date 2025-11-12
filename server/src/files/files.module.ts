import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SupabaseService } from "src/supabase/supabase.service";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
    controllers: [FilesController],
    providers: [FilesService, PrismaService, SupabaseService],
})
export class FilesModule {}
