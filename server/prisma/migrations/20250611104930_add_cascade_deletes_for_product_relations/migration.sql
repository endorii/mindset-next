-- DropForeignKey
ALTER TABLE "ProductToColor" DROP CONSTRAINT "ProductToColor_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductToSize" DROP CONSTRAINT "ProductToSize_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductToType" DROP CONSTRAINT "ProductToType_product_id_fkey";

-- AddForeignKey
ALTER TABLE "ProductToColor" ADD CONSTRAINT "ProductToColor_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToSize" ADD CONSTRAINT "ProductToSize_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToType" ADD CONSTRAINT "ProductToType_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
