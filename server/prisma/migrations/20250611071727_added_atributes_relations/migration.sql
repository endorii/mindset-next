/*
  Warnings:

  - You are about to drop the `ProductColor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductSize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductColor" DROP CONSTRAINT "ProductColor_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductSize" DROP CONSTRAINT "ProductSize_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductType" DROP CONSTRAINT "ProductType_product_id_fkey";

-- DropTable
DROP TABLE "ProductColor";

-- DropTable
DROP TABLE "ProductSize";

-- DropTable
DROP TABLE "ProductType";

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hexCode" TEXT,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductToColor" (
    "product_id" TEXT NOT NULL,
    "color_id" TEXT NOT NULL,

    CONSTRAINT "ProductToColor_pkey" PRIMARY KEY ("product_id","color_id")
);

-- CreateTable
CREATE TABLE "ProductToSize" (
    "product_id" TEXT NOT NULL,
    "size_id" TEXT NOT NULL,

    CONSTRAINT "ProductToSize_pkey" PRIMARY KEY ("product_id","size_id")
);

-- CreateTable
CREATE TABLE "ProductToType" (
    "product_id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,

    CONSTRAINT "ProductToType_pkey" PRIMARY KEY ("product_id","type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Color_name_key" ON "Color"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Size_name_key" ON "Size"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- AddForeignKey
ALTER TABLE "ProductToColor" ADD CONSTRAINT "ProductToColor_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToColor" ADD CONSTRAINT "ProductToColor_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToSize" ADD CONSTRAINT "ProductToSize_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToSize" ADD CONSTRAINT "ProductToSize_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToType" ADD CONSTRAINT "ProductToType_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToType" ADD CONSTRAINT "ProductToType_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
