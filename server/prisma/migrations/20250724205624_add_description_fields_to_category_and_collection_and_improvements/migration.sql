/*
  Warnings:

  - You are about to drop the column `hexCode` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `RecentAction` table. All the data in the column will be lost.
  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `old_price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Color" DROP COLUMN "hexCode",
ADD COLUMN     "hex_code" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "old_price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RecentAction" DROP COLUMN "timestamp",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
