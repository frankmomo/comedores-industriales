import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        email: "admin@demo.com",
        password: "admin123",
        role: "ADMIN",
      },
      {
        name: "Usuario",
        email: "user@demo.com",
        password: "user123",
        role: "USER",
      },
    ],
    skipDuplicates: true,
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
