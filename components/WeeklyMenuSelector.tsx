"use client";

import { useMemo, useState } from "react";

type Dish = {
  id: string;
  name: string;
  group: "BREAKFAST_MAIN" | "LUNCH_MAIN" | "COMPLEMENT" | "CONSUME" | "DESSERT";
  position: number | null;
};

type MenuDay = {
  id: string;
  day: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
  dishes: Dish[];
};

export type WeeklyMenu = {
  id: string;
  name: string;
  week: number;
  year: number;
  startDate: string | null;
  endDate: string | null;
  days: MenuDay[];
};

const dayNames: Record<MenuDay["day"], string> = {
  MON: "Lunes",
  TUE: "Martes",
  WED: "Miercoles",
  THU: "Jueves",
  FRI: "Viernes",
  SAT: "Sabado",
  SUN: "Domingo",
};

const dayOrder: Record<MenuDay["day"], number> = {
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
  SUN: 7,
};

export function WeeklyMenuSelector({
  menus,
  defaultMenuId,
}: {
  menus: WeeklyMenu[];
  defaultMenuId?: string;
}) {
  const [selectedMenuId, setSelectedMenuId] = useState(defaultMenuId ?? menus[0]?.id ?? "");
  const selectedMenu = useMemo(
    () => menus.find((menu) => menu.id === selectedMenuId) ?? menus[0],
    [menus, selectedMenuId],
  );

  if (menus.length === 0) {
    return <p>No hay menus guardados.</p>;
  }

  return (
    <div className="space-y-5">
      <label className="block space-y-1 text-sm font-medium text-gray-700">
        Menu guardado
        <select
          value={selectedMenu?.id ?? ""}
          onChange={(event) => setSelectedMenuId(event.target.value)}
          className="min-h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:max-w-xl"
        >
          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </select>
      </label>

      {selectedMenu && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{selectedMenu.name}</h2>
            <p className="text-sm text-gray-600">
              Semana {selectedMenu.week} de {selectedMenu.year}
            </p>
          </div>

          {selectedMenu.days
            .slice()
            .sort((a, b) => dayOrder[a.day] - dayOrder[b.day])
            .map((day) => {
              const desayuno = day.dishes
                .filter((dish) => dish.group === "BREAKFAST_MAIN")
                .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
              const comida = day.dishes
                .filter((dish) => dish.group === "LUNCH_MAIN")
                .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
              const complementos = day.dishes
                .filter((dish) => dish.group === "COMPLEMENT")
                .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
              const consome = day.dishes.find((dish) => dish.group === "CONSUME");
              const postre = day.dishes.find((dish) => dish.group === "DESSERT");

              return (
                <div key={day.id} className="mb-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold">{dayNames[day.day]}</h3>
                  <div>
                    <strong>Desayuno:</strong> {desayuno.map((dish) => dish.name).join(" / ") || "-"}
                  </div>
                  <div>
                    <strong>Comida:</strong> {comida.map((dish) => dish.name).join(" / ") || "-"}
                  </div>
                  <div>
                    <strong>Complemento 1:</strong>{" "}
                    {complementos.find((dish) => dish.position === 1)?.name || "-"}
                  </div>
                  <div>
                    <strong>Complemento 2:</strong>{" "}
                    {complementos.find((dish) => dish.position === 2)?.name || "-"}
                  </div>
                  <div>
                    <strong>Consome:</strong> {consome?.name || "-"}
                  </div>
                  <div>
                    <strong>Postre:</strong> {postre?.name || "-"}
                  </div>
                </div>
              );
            })}
        </section>
      )}
    </div>
  );
}
