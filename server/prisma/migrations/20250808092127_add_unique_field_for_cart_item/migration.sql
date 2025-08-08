/*
  Warnings:

  - A unique constraint covering the columns `[user_id,product_id,size,type,color]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartItem_user_id_product_id_size_type_color_key" ON "CartItem"("user_id", "product_id", "size", "type", "color");
