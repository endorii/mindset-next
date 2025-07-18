/*
  Warnings:

  - You are about to drop the column `delivery_type` on the `Order` table. All the data in the column will be lost.
  - Added the required column `area` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "delivery_type",
ADD COLUMN     "area" TEXT NOT NULL,
ADD COLUMN     "branch" TEXT NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- DropEnum
DROP TYPE "DeliveryType";
