/*
  Warnings:

  - Added the required column `senderEmail` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderName` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "senderEmail" TEXT NOT NULL,
ADD COLUMN     "senderName" TEXT NOT NULL;
