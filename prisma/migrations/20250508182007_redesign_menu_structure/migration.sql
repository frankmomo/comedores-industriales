-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI');

-- CreateEnum
CREATE TYPE "DishGroup" AS ENUM ('BREAKFAST_MAIN', 'LUNCH_MAIN', 'COMPLEMENT', 'CONSUME', 'DESSERT');

-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayMenu" (
    "id" TEXT NOT NULL,
    "day" "WeekDay" NOT NULL,
    "menuId" TEXT NOT NULL,

    CONSTRAINT "DayMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dish" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "group" "DishGroup" NOT NULL,
    "position" INTEGER,
    "dayMenuId" TEXT NOT NULL,

    CONSTRAINT "Dish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Menu_week_year_key" ON "Menu"("week", "year");

-- CreateIndex
CREATE UNIQUE INDEX "DayMenu_menuId_day_key" ON "DayMenu"("menuId", "day");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayMenu" ADD CONSTRAINT "DayMenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_dayMenuId_fkey" FOREIGN KEY ("dayMenuId") REFERENCES "DayMenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
