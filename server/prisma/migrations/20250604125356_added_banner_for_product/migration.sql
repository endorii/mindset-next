/*
  Warnings:

  - Added the required column `banner` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "banner" TEXT NOT NULL;
