CREATE TYPE "CatalogDishType" AS ENUM ('BREAKFAST', 'LUNCH', 'COMPLEMENT', 'CONSOMME', 'DESSERT');

CREATE TABLE "CatalogDish" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CatalogDishType" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatalogDish_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CatalogDish_name_type_key" ON "CatalogDish"("name", "type");
