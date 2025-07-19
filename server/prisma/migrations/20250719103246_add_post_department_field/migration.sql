/*
  Warnings:

  - You are about to drop the column `branch` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Order` table. All the data in the column will be lost.
  - Added the required column `post_department` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "branch",
DROP COLUMN "destination",
ADD COLUMN     "post_department" TEXT NOT NULL;
