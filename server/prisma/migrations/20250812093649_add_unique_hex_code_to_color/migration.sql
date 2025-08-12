/*
  Warnings:

  - A unique constraint covering the columns `[hex_code]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - Made the column `hex_code` on table `Color` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Color" ALTER COLUMN "hex_code" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Color_hex_code_key" ON "Color"("hex_code");
