import { prisma } from "@/lib/prisma";

export async function ensureMenuMetadataColumns() {
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Menu"
    ADD COLUMN IF NOT EXISTS "name" TEXT,
    ADD COLUMN IF NOT EXISTS "startDate" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "endDate" TIMESTAMP(3);
  `);
}
