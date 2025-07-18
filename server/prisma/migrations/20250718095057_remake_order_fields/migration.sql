/*
  Warnings:

  - You are about to drop the column `additionalInfo` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryType` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `delivery_type` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "additionalInfo",
DROP COLUMN "createdAt",
DROP COLUMN "deliveryType",
DROP COLUMN "fullName",
DROP COLUMN "phoneNumber",
DROP COLUMN "userId",
ADD COLUMN     "additional_info" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "delivery_type" "DeliveryType" NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT;

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
