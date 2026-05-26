import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { ensureMenuMetadataColumns } from "@/lib/menuMetadata";
import { buildMenuName } from "@/lib/menuDates";
import { WeeklyMenu, WeeklyMenuSelector } from "@/components/WeeklyMenuSelector";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  const now = new Date();
  const currentWeek = getWeek(now);
  const year = now.getFullYear();

  await ensureMenuMetadataColumns();

  const menus = await prisma.menu.findMany({
    include: {
      days: {
        include: { dishes: true },
      },
    },
    orderBy: [{ year: "desc" }, { week: "desc" }, { createdAt: "desc" }],
  });

  const serializedMenus: WeeklyMenu[] = menus.map((menu) => ({
    id: menu.id,
    name:
      menu.name ||
      (menu.startDate && menu.endDate
        ? buildMenuName(menu.startDate.toISOString().slice(0, 10), menu.endDate.toISOString().slice(0, 10))
        : `Menu semana ${menu.week} de ${menu.year}`),
    week: menu.week,
    year: menu.year,
    startDate: menu.startDate?.toISOString() ?? null,
    endDate: menu.endDate?.toISOString() ?? null,
    days: menu.days.map((day) => ({
      id: day.id,
      day: day.day,
      dishes: day.dishes.map((dish) => ({
        id: dish.id,
        name: dish.name,
        group: dish.group,
        position: dish.position,
      })),
    })),
  }));

  const defaultMenu =
    serializedMenus.find((menu) => menu.week === currentWeek && menu.year === year) ?? serializedMenus[0];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold">Menu semanal</h1>
      <WeeklyMenuSelector menus={serializedMenus} defaultMenuId={defaultMenu?.id} />
    </main>
  );
}

function getWeek(date: Date): number {
  const temp = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = temp.getDay() || 7;
  temp.setDate(temp.getDate() + 4 - day);
  const yearStart = new Date(temp.getFullYear(), 0, 1);
  return Math.ceil(((+temp - +yearStart) / 86400000 + 1) / 7);
}
