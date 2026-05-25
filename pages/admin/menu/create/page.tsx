// pages/admin/menu/create/page.tsx
"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { MenuCreatorDropdown } from "@/components/MenuCreatorDropdown";
import { MenuCreatorManual } from "@/components/MenuCreatorManual";

export default function AdminMenuCreatePage() {
  const { data: session } = useSession();
  const [mode, setMode] = useState<"dropdown" | "manual">("dropdown");

  if (!session) return <p className="text-center py-10">Cargando…</p>;
  if (session.user.role !== "ADMIN")
    return <p className="text-center py-10 text-red-500 font-semibold">Acceso solo administradores.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Crear menú semanal</h2>
      <div>
        <button
          className={`px-3 py-1 mr-2 rounded ${mode === "dropdown" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("dropdown")}
        >
          Listas desplegables
        </button>
        <button
          className={`px-3 py-1 rounded ${mode === "manual" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("manual")}
        >
          IDs manuales
        </button>
      </div>
      {mode === "dropdown" ? <MenuCreatorDropdown /> : <MenuCreatorManual />}
    </div>
  );
}
