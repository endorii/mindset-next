/*
  Warnings:

  - You are about to drop the column `color` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Favorite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,product_id]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Favorite_user_id_product_id_size_type_color_key";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "color",
DROP COLUMN "size",
DROP COLUMN "type";

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_user_id_product_id_key" ON "Favorite"("user_id", "product_id");
