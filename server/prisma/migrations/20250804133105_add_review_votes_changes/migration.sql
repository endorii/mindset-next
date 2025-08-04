/*
  Warnings:

  - You are about to drop the column `isApproved` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `isHelpful` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `isNotHelpful` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ReviewVote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "isApproved",
DROP COLUMN "isHelpful",
DROP COLUMN "isNotHelpful",
ADD COLUMN     "is_approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_helpful" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "is_not_helpful" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ReviewVote" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
