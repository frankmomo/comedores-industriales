import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CatalogDishItem, exampleDishes } from "@/lib/dishCatalog";
import { buildMenuName } from "@/lib/menuDates";
import { ensureMenuMetadataColumns } from "@/lib/menuMetadata";
import { ensureCatalogDishTable } from "@/lib/catalogMetadata";

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

  const { week, year, days, menuName, startDate, endDate } = await req.json();
  let authorId: string | undefined = session.user.id;

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
    await ensureMenuMetadataColumns();
    await ensureCatalogDishTable();
    const safeStartDate = startDate || new Date().toISOString().slice(0, 10);
    const safeEndDate = endDate || safeStartDate;

    const selectedIds = Array.from(
      new Set(
        days.flatMap((day: any) =>
          Array.isArray(day.dishes) ? day.dishes.map((dish: any) => dish.id).filter(Boolean) : [],
        ),
      ),
    ) as number[];

    let catalogDishes: CatalogDishItem[] = [];

    try {
      const existingCatalogDishes = await prisma.catalogDish.findMany({
        where: { id: { in: selectedIds }, active: true },
        select: { id: true, name: true, type: true },
      });

      const customDishes = days.flatMap((day: any) =>
        Array.isArray(day.dishes)
          ? day.dishes
              .filter((dish: any) => !dish.id && dish.name && dish.type)
              .map((dish: any) => ({
                name: String(dish.name).trim(),
                type: dish.type,
              }))
          : [],
      );

      const uniqueCustomDishes = new Map<string, { name: string; type: any }>();
      customDishes.forEach((dish: { name: string; type: any }) => {
        if (dish.name) uniqueCustomDishes.set(`${dish.type}:${dish.name.toLowerCase()}`, dish);
      });

      const createdCatalogDishes = await Promise.all(
        [...uniqueCustomDishes.values()].map((dish) =>
          prisma.catalogDish.upsert({
            where: {
              name_type: {
                name: dish.name,
                type: dish.type,
              },
            },
            update: { active: true },
            create: {
              name: dish.name,
              type: dish.type,
              active: true,
            },
            select: { id: true, name: true, type: true },
          }),
        ),
      );

      catalogDishes = [...existingCatalogDishes, ...createdCatalogDishes];
    } catch (error) {
      console.warn("Using example dishes because the catalog table is unavailable.", error);
      catalogDishes = exampleDishes;
    }

    const existingMenus = await prisma.menu.findMany({
      where: { week, year },
      select: { id: true },
    });

    const existingMenuIds = existingMenus.map((menu: { id: string }) => menu.id);

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
        name: String(menuName || "").trim() || buildMenuName(safeStartDate, safeEndDate),
        startDate: new Date(`${safeStartDate}T00:00:00`),
        endDate: new Date(`${safeEndDate}T00:00:00`),
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
                    const selectedDish =
                      catalogDishes.find((item) => item.id === dish.id) ??
                      catalogDishes.find(
                        (item) =>
                          item.type === dish.type &&
                          item.name.trim().toLowerCase() === String(dish.name ?? "").trim().toLowerCase(),
                      );
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
