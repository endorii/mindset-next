/*
  Warnings:

  - A unique constraint covering the columns `[user_id,product_id,size,type,color]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite_user_id_product_id_size_type_color_key" ON "Favorite"("user_id", "product_id", "size", "type", "color");
