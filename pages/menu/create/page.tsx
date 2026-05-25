// pages/admin/menu/create/page.tsx
import { useSession } from "next-auth/react";
import { useState } from "react";
import { MenuCreatorDropdown } from "@/components/MenuCreatorDropdown";
import { MenuCreatorManual } from "@/components/MenuCreatorManual";

export default function AdminMenuCreatePage() {
  const { data: session } = useSession();
  const [mode, setMode] = useState<"dropdown" | "manual">("dropdown");

  if (!session || session.user.role !== "ADMIN") {
    return <p className="text-center py-10 text-red-500 font-semibold">Acceso restringido solo a administradores.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Crear nuevo menú semanal</h2>
      <div className="mb-6">
        <label className="mr-4 font-medium">Modo de creación:</label>
        <button
          className={`px-3 py-1 rounded mr-2 ${mode === "dropdown" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("dropdown")}
        >
          Usar listas desplegables
        </button>
        <button
          className={`px-3 py-1 rounded ${mode === "manual" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("manual")}
        >
          Ingresar IDs manualmente
        </button>
      </div>

      {mode === "dropdown" ? <MenuCreatorDropdown /> : <MenuCreatorManual />}
    </div>
  );
}