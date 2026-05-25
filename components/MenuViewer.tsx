"use client";
import { useEffect, useState } from "react";
import { getWeek } from "@/utils/getWeek";

export default function MenuViewer({ week = getWeek() }: { week?: number }) {
  const [menu, setMenu] = useState<any | null>(null);

  useEffect(() => {
    fetch(`/api/menu/semana/${week}`)
      .then((res) => res.json())
      .then(setMenu);
  }, [week]);

  if (!menu) return <p className="text-center py-4">Cargando menú…</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Menú – semana {menu.week_number}</h2>
      {menu.menu_days.map((day: any) => (
        <div key={day.id} className="p-4 border rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">{day.day}</h3>
          <ul className="space-y-1">
            {day.menu_day_dishes.map((dish: any) => (
              <li key={dish.id}>
                <span className="font-semibold mr-1">{dish.category}:</span>{dish.dishes.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
