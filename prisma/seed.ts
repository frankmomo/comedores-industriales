import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Admin',
        email: 'admin@demo.com',
        password: 'admin123',
        role: 'ADMIN',
      },
      {
        name: 'Usuario',
        email: 'user@demo.com',
        password: 'user123',
        role: 'USER',
      },
    ],
    skipDuplicates: true
  });

  const dishes = [
    { name: 'Chilaquiles verdes', dish_type: 'BREAKFAST' },
    { name: 'Huevos al gusto', dish_type: 'BREAKFAST' },
    { name: 'Milanesa de res', dish_type: 'LUNCH' },
    { name: 'Enchiladas rojas', dish_type: 'LUNCH' }
  ];

  for (const dish of dishes) {
    await prisma.dish.create({
      data: {
        name: dish.name,
        dish_type: dish.dish_type
      }
    });
  }

  console.log('✅ Seed completado correctamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
