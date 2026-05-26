import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const DishSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["BREAKFAST", "LUNCH", "SIDE", "BROTH", "DESSERT"]),
});

const DaySchema = z.object({
  day: z.enum(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]),
  dishes: z.array(DishSchema),
});

const WeekMenuSchema = z.object({
  days: z.array(DaySchema),
});

const groupMap = {
  BREAKFAST: "BREAKFAST_MAIN",
  LUNCH: "LUNCH_MAIN",
  SIDE: "COMPLEMENT",
  BROTH: "CONSUME",
  DESSERT: "DESSERT",
} as const;

function getWeek(date: Date): number {
  const temp = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = temp.getDay() || 7;
  temp.setDate(temp.getDate() + 4 - day);
  const yearStart = new Date(temp.getFullYear(), 0, 1);
  return Math.ceil(((+temp - +yearStart) / 86400000 + 1) / 7);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = WeekMenuSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const author = await prisma.user.findFirst({
    where: { role: "ADMIN" },
    select: { id: true },
  });

  if (!author) {
    return NextResponse.json({ error: "No hay usuario administrador." }, { status: 400 });
  }

  const now = new Date();
  const menu = await prisma.menu.create({
    data: {
      week: getWeek(now),
      year: now.getFullYear(),
      authorId: author.id,
      days: {
        create: parsed.data.days
          .filter((day) => day.dishes.length > 0)
          .map((day) => ({
            day: day.day,
            dishes: {
              create: day.dishes.map((dish, index) => ({
                name: dish.name,
                group: groupMap[dish.type],
                position: index + 1,
              })),
            },
          })),
      },
    },
  });

  return NextResponse.json(menu, { status: 201 });
}

export async function GET() {
  const menus = await prisma.menu.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, week: true, year: true },
  });

  return NextResponse.json(menus);
}
