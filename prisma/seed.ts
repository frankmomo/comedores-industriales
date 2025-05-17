// prisma/seed.ts
import { PrismaClient, DishGroup, WeekDay } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hash demo: admin123
  const hash = await bcrypt.hash("admin123", 10);


  // ── 1. Usuario admin mínimo ──────────────────────────────────────────
console.log("URL:", process.env.DATABASE_URL);

  const admin = await prisma.user.upsert({
    where: { email: "admin@demo.com" },
    update: {},
    create: {
      email: "admin@demo.com",
      name: "Administrador",
      password: hash, // ← AHORA sí se pasa el valor correcto
      role: "ADMIN"
    },
  });

  // ── 2. Menú de la semana 19-2025 con sólo Lunes de ejemplo ───────────
  await prisma.menu.create({
    data: {
      week: 19,
      year: 2025,
      authorId: admin.id,
      days: {
        create: {
          day: WeekDay.MON,
          dishes: {
            create: [
              { name: "Huevos Rancheros", group: DishGroup.BREAKFAST_MAIN, position: 1 },
              { name: "Chilaquiles Verdes", group: DishGroup.BREAKFAST_MAIN, position: 2 },
              { name: "Milanesa de Pollo", group: DishGroup.LUNCH_MAIN, position: 1 },
              { name: "Carne en su Jugo", group: DishGroup.LUNCH_MAIN, position: 2 },
              { name: "Frijoles Refritos", group: DishGroup.COMPLEMENT },
              { name: "Arroz Rojo", group: DishGroup.COMPLEMENT },
              { name: "Consomé de Pollo", group: DishGroup.CONSUME },
              { name: "Gelatina de Fresa", group: DishGroup.DESSERT },
            ],
          },
        },
      },
    },
  });

  console.log("✅  Seed completado");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
