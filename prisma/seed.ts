import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  await prisma.user.upsert({
    where: { email: "admin@demo.com" },
    update: {
      name: "Admin",
      password: adminPassword,
      role: "ADMIN",
    },
    create: {
      name: "Admin",
      email: "admin@demo.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "user@demo.com" },
    update: {
      name: "Usuario",
      password: userPassword,
      role: "USER",
    },
    create: {
      name: "Usuario",
      email: "user@demo.com",
      password: userPassword,
      role: "USER",
    },
  });

  console.log("Seed completado correctamente.");
}

main()
  .catch((error) => {
    console.error("Error durante el seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
