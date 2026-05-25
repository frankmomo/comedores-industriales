// app/api/admin/menus/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

/* --------- Zod: misma forma que el formulario ------------------- */
const DishSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['BREAKFAST', 'LUNCH', 'SIDE', 'BROTH', 'DESSERT']),
});

const DaySchema = z.object({
  day: z.enum(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']),
  dishes: z.array(DishSchema),            // 0 – 8 platillos
});

const WeekMenuSchema = z.object({
  label: z.string(),
  days: z.array(DaySchema).length(7),
});

/* ---------------------------------------------------------------- */
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = WeekMenuSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { label, days } = parsed.data;

  // Crea el menú + los días que tengan al menos 1 platillo
  const menu = await prisma.menu.create({
    data: {
      label,
      weekStart: new Date(), // o calcula lunes de la semana si lo necesitas
      dayMenus: {
        create: days
          .filter((d) => d.dishes.length > 0)
          .map((d) => ({
            day: d.day,
            dishes: {
              create: d.dishes.map((ds) => ({
                name: ds.name,
                type: ds.type,
              })),
            },
          })),
      },
    },
  });

  return NextResponse.json(menu, { status: 201 });
}

/* (Opcional) GET → lista rápida de menús */
export async function GET() {
  const menus = await prisma.menu.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, label: true },
  });
  return NextResponse.json(menus);
}
