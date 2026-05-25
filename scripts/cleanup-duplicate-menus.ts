import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Limpiando menús duplicados...');

  // Buscar etiquetas duplicadas en Menu
  const duplicates = await prisma.menu.findMany({
    where: {
      label: {
        in: await prisma.menu.groupBy({
          by: ['label'],
          having: {
            label: {
              _count: {
                gt: 1,
              },
            },
          },
        }).then((groups) => groups.map((g) => g.label)),
      },
    },
    include: {
      dayMenus: {
        include: {
          dishes: true,
        },
      },
    },
  });

  const keep: Record<string, boolean> = {};

  for (const menu of duplicates) {
    // Solo conservamos uno por etiqueta
    if (keep[menu.label]) {
      for (const day of menu.dayMenus) {
        // Eliminar primero los platillos del menú diario
        await prisma.dish.deleteMany({
          where: {
            dayMenuId: day.id,
          },
        });

        // Luego eliminar el menú diario
        await prisma.dayMenu.delete({
          where: {
            id: day.id,
          },
        });
      }

      // Finalmente eliminar el menú duplicado
      await prisma.menu.delete({
        where: {
          id: menu.id,
        },
      });

      console.log(`✅ Eliminado menú duplicado: ${menu.label} (${menu.id})`);
    } else {
      keep[menu.label] = true;
    }
  }

  console.log('✅ Limpieza de duplicados completada.');
}

main()
  .catch((e) => {
    console.error('❌ Error limpiando duplicados:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
