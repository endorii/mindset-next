/*
  Warnings:

  - Added the required column `type` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
