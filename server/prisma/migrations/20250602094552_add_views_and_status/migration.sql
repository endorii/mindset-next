/*
  Warnings:

  - Added the required column `status` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL;
