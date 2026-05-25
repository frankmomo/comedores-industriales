import { prisma } from "@/lib/prisma";

export async function getWeeklyMenu(userId: number, week: number, year: number) {
  return await prisma.menu.findFirst({
    where: { user_id: userId, week_number: week, year },
    include: {
      menu_days: {
        include: {
          menu_day_dishes: {
            include: {
              dishes: true
            },
            orderBy: { position: "asc" }
          }
        },
        orderBy: { day: "asc" }
      }
    }
  });
}
