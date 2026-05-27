import { prisma } from "@/lib/prisma";

export async function ensureCatalogDishTable() {
  await prisma.$executeRawUnsafe(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'CatalogDishType') THEN
        CREATE TYPE "CatalogDishType" AS ENUM ('BREAKFAST', 'LUNCH', 'COMPLEMENT', 'CONSOMME', 'DESSERT');
      END IF;
    END
    $$;
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "CatalogDish" (
      "id" SERIAL NOT NULL,
      "name" TEXT NOT NULL,
      "type" "CatalogDishType" NOT NULL,
      "active" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "CatalogDish_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "CatalogDish_name_type_key" ON "CatalogDish"("name", "type");
  `);
}
