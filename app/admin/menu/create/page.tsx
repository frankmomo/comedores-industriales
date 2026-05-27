"use client";

import { MenuCreatorDropdown } from "@/components/MenuCreatorDropdown";
import { MenuCreatorManual } from "@/components/MenuCreatorManual";
import { buildMenuName, getCurrentWeekRange } from "@/lib/menuDates";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AdminMenuCreatePage() {
  const { data: session } = useSession();
  const [mode, setMode] = useState<"dropdown" | "manual">("dropdown");
  const initialRange = getCurrentWeekRange();
  const [startDate, setStartDate] = useState(initialRange.startDate);
  const [endDate, setEndDate] = useState(initialRange.endDate);
  const [menuName, setMenuName] = useState(buildMenuName(initialRange.startDate, initialRange.endDate));

  const updateDates = (nextStartDate: string, nextEndDate: string) => {
    setStartDate(nextStartDate);
    setEndDate(nextEndDate);
    setMenuName(buildMenuName(nextStartDate, nextEndDate));
  };

  const menuMeta = {
    menuName,
    startDate,
    endDate,
  };

  if (!session) return <p className="py-10 text-center">Cargando...</p>;
  if (session.user.role !== "ADMIN") {
    return <p className="py-10 text-center font-semibold text-red-500">Acceso solo administradores.</p>;
  }

  return (
    <main className="mx-auto w-full max-w-4xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Crear menu semanal</h2>
        <p className="text-sm text-gray-600">
          Selecciona platillos por dia o captura IDs manualmente.
        </p>
      </div>

      <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1 text-sm font-medium text-gray-700 sm:col-span-2">
            Nombre del menu
            <input
              type="text"
              value={menuName}
              onChange={(event) => setMenuName(event.target.value)}
              className="min-h-11 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-gray-700">
            Fecha inicial
            <input
              type="date"
              value={startDate}
              onChange={(event) => updateDates(event.target.value, endDate)}
              className="min-h-11 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-gray-700">
            Fecha final
            <input
              type="date"
              value={endDate}
              onChange={(event) => updateDates(startDate, event.target.value)}
              className="min-h-11 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>
      </section>

      <div className="grid gap-2 rounded-md bg-gray-100 p-1 sm:inline-grid sm:grid-cols-2">
        <button
          type="button"
          className={`min-h-11 rounded-md px-4 py-2 text-sm font-semibold transition ${
            mode === "dropdown" ? "bg-primary text-white shadow-sm" : "text-gray-700 hover:bg-white"
          }`}
          onClick={() => setMode("dropdown")}
        >
          Autocompletar platillos
        </button>
        <button
          type="button"
          className={`min-h-11 rounded-md px-4 py-2 text-sm font-semibold transition ${
            mode === "manual" ? "bg-secondary text-white shadow-sm" : "text-gray-700 hover:bg-white"
          }`}
          onClick={() => setMode("manual")}
        >
          IDs manuales
        </button>
      </div>

      {mode === "dropdown" ? <MenuCreatorDropdown menuMeta={menuMeta} /> : <MenuCreatorManual menuMeta={menuMeta} />}
    </main>
  );
}
