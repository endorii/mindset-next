-- DropForeignKey
ALTER TABLE "ProductToColor" DROP CONSTRAINT "ProductToColor_color_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductToSize" DROP CONSTRAINT "ProductToSize_size_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductToType" DROP CONSTRAINT "ProductToType_type_id_fkey";

-- AddForeignKey
ALTER TABLE "ProductToColor" ADD CONSTRAINT "ProductToColor_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToSize" ADD CONSTRAINT "ProductToSize_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "Size"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToType" ADD CONSTRAINT "ProductToType_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
