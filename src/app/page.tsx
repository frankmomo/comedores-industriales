// app/menu/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { DishGroup, WeekDay } from "@prisma/client";

const dayNames: Record<WeekDay, string> = {
  MON: "Lunes",
  TUE: "Martes",
  WED: "Miércoles",
  THU: "Jueves",
  FRI: "Viernes",
};

export default async function MenuPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  const now = new Date();
  const currentWeek = getWeek(now);
  const year = now.getFullYear();

  const menu = await prisma.menu.findFirst({
    where: { week: currentWeek, year },
    include: {
      days: {
        orderBy: { day: "asc" },
        include: { dishes: true },
      },
    },
  });

  if (!menu) return <div className="p-4">No hay menú para esta semana.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Menú semanal</h1>
      <div className="grid gap-4">
        {menu.days.map((day) => {
          const desayuno = day.dishes
            .filter((d) => d.group === "BREAKFAST_MAIN")
            .sort((a, b) => a.position! - b.position!);
          const comida = day.dishes
            .filter((d) => d.group === "LUNCH_MAIN")
            .sort((a, b) => a.position! - b.position!);
          const complementos = day.dishes.filter((d) => d.group === "COMPLEMENT");
          const consome = day.dishes.find((d) => d.group === "CONSUME");
          const postre = day.dishes.find((d) => d.group === "DESSERT");

          return (
            <div key={day.day} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">{dayNames[day.day]}</h2>
              <div><strong>Desayuno:</strong> {desayuno.map(d => d.name).join(" / ")}</div>
              <div><strong>Comida:</strong> {comida.map(d => d.name).join(" / ")}</div>
              <div><strong>Complementos:</strong> {complementos.map(d => d.name).join(", ")}</div>
              <div><strong>Consomé:</strong> {consome?.name || "-"}</div>
              <div><strong>Postre:</strong> {postre?.name || "-"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Devuelve número de semana ISO
function getWeek(date: Date): number {
  const temp = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = temp.getDay() || 7;
  temp.setDate(temp.getDate() + 4 - day);
  const yearStart = new Date(temp.getFullYear(), 0, 1);
  return Math.ceil(((+temp - +yearStart) / 86400000 + 1) / 7);
}
