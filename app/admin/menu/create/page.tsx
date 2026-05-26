"use client";

import { MenuCreatorDropdown } from "@/components/MenuCreatorDropdown";
import { MenuCreatorManual } from "@/components/MenuCreatorManual";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AdminMenuCreatePage() {
  const { data: session } = useSession();
  const [mode, setMode] = useState<"dropdown" | "manual">("dropdown");

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

      <div className="grid gap-2 rounded-md bg-gray-100 p-1 sm:inline-grid sm:grid-cols-2">
        <button
          type="button"
          className={`min-h-11 rounded-md px-4 py-2 text-sm font-semibold transition ${
            mode === "dropdown" ? "bg-primary text-white shadow-sm" : "text-gray-700 hover:bg-white"
          }`}
          onClick={() => setMode("dropdown")}
        >
          Listas desplegables
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

      {mode === "dropdown" ? <MenuCreatorDropdown /> : <MenuCreatorManual />}
    </main>
  );
}
