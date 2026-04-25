import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DishGroup, WeekDay } from "@prisma/client";

type NewMenu = {
  authorId: string;
  week: number;
  year: number;
  days: {
    day: WeekDay;
    dishes: {
      name: string;
      group: DishGroup;
      position?: number | null;
    }[];
  }[];
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = (await req.json()) as NewMenu;
  const { authorId, week, year, days } = data;

  const menu = await prisma.menu.create({
    data: {
      week,
      year,
      authorId,
      days: {
        create: days.map((day) => ({
          day: day.day,
          dishes: {
            create: day.dishes.map((d) => ({
              name: d.name,
              group: d.group,
              position: d.position ?? null,
            })),
          },
        })),
      },
    },
  });

  return NextResponse.json(menu, { status: 201 });
}
