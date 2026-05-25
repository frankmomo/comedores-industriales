/*
  Warnings:

  - You are about to drop the column `group` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `week` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `day` on the `DayMenu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `type` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekStart` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DishType" AS ENUM ('BREAKFAST', 'LUNCH', 'SIDE', 'BROTH', 'DESSERT');

-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_authorId_fkey";

-- DropIndex
DROP INDEX "DayMenu_menuId_day_key";

-- AlterTable
ALTER TABLE "DayMenu" DROP COLUMN "day",
ADD COLUMN     "day" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "group",
DROP COLUMN "position",
ADD COLUMN     "type" "DishType" NOT NULL;

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "authorId",
DROP COLUMN "week",
DROP COLUMN "year",
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "weekStart" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "DishGroup";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "WeekDay";
