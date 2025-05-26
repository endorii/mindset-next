/*
  Warnings:

  - A unique constraint covering the columns `[collection_id,path]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category_collection_id_path_key" ON "Category"("collection_id", "path");
