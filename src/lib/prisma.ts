import { PrismaClient } from "@prisma/client";

// Previene la creación de múltiples instancias en hot‑reload
export const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
