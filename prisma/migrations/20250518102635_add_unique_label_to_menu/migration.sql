/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Menu_label_key" ON "Menu"("label");
