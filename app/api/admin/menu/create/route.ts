import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const exampleDishes = [
  { id: 1, name: "Chilaquiles verdes con pollo", type: "BREAKFAST" },
  { id: 2, name: "Huevos revueltos con jamon", type: "BREAKFAST" },
  { id: 3, name: "Hot cakes con fruta", type: "BREAKFAST" },
  { id: 4, name: "Milanesa de pollo", type: "LUNCH" },
  { id: 5, name: "Carne asada con arroz", type: "LUNCH" },
  { id: 6, name: "Enchiladas rojas", type: "LUNCH" },
  { id: 7, name: "Frijoles refritos", type: "COMPLEMENT" },
  { id: 8, name: "Verduras al vapor", type: "COMPLEMENT" },
  { id: 9, name: "Ensalada mixta", type: "COMPLEMENT" },
  { id: 10, name: "Consome de pollo", type: "CONSOMME" },
  { id: 11, name: "Sopa de fideo", type: "CONSOMME" },
  { id: 12, name: "Gelatina de sabores", type: "DESSERT" },
  { id: 13, name: "Arroz con leche", type: "DESSERT" },
  { id: 14, name: "Flan napolitano", type: "DESSERT" },
];

const dayMap: Record<string, "MON" | "TUE" | "WED" | "THU" | "FRI"> = {
  MONDAY: "MON",
  TUESDAY: "TUE",
  WEDNESDAY: "WED",
  THURSDAY: "THU",
  FRIDAY: "FRI",
};

const groupMap: Record<string, "BREAKFAST_MAIN" | "LUNCH_MAIN" | "COMPLEMENT" | "CONSUME" | "DESSERT"> = {
  BREAKFAST: "BREAKFAST_MAIN",
  LUNCH: "LUNCH_MAIN",
  COMPLEMENT: "COMPLEMENT",
  CONSOMME: "CONSUME",
  DESSERT: "DESSERT",
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { week, year, days } = await req.json();
  let authorId = session.user.id;

  if (!authorId && session.user.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    authorId = user?.id;
  }

  if (!authorId) {
    return NextResponse.json({ error: "No se pudo identificar el usuario." }, { status: 400 });
  }

  try {
    const existingMenus = await prisma.menu.findMany({
      where: { week, year },
      select: { id: true },
    });

    const existingMenuIds = existingMenus.map((menu) => menu.id);

    if (existingMenuIds.length > 0) {
      await prisma.dish.deleteMany({
        where: {
          dayMenu: {
            menuId: { in: existingMenuIds },
          },
        },
      });
      await prisma.dayMenu.deleteMany({
        where: {
          menuId: { in: existingMenuIds },
        },
      });
      await prisma.menu.deleteMany({
        where: {
          id: { in: existingMenuIds },
        },
      });
    }

    const created = await prisma.menu.create({
      data: {
        week,
        year,
        authorId,
        days: {
          create: days
            .filter((day: any) => dayMap[day.name])
            .map((day: any) => ({
              day: dayMap[day.name],
              dishes: {
                create: day.dishes
                  .map((dish: any) => {
                    const selectedDish = exampleDishes.find((item) => item.id === dish.id);
                    const group = groupMap[dish.category];

                    if (!selectedDish || !group) return null;

                    return {
                      name: selectedDish.name,
                      group,
                      position: dish.position,
                    };
                  })
                  .filter(Boolean),
              },
            })),
        },
      },
    });

    return NextResponse.json(created);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error creando menu" }, { status: 500 });
  }
}
