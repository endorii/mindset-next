/*
  Warnings:

  - A unique constraint covering the columns `[category_id,path]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_category_id_path_key" ON "Product"("category_id", "path");
