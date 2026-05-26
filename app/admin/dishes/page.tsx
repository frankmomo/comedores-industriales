"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { CatalogDishItem, CatalogDishType, catalogTypeLabels, catalogTypes } from "@/lib/dishCatalog";

type UploadResult = {
  total: number;
  counts: Record<CatalogDishType, number>;
};

export default function AdminDishesPage() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [dishes, setDishes] = useState<CatalogDishItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const groupedDishes = useMemo(
    () =>
      catalogTypes.map((type) => ({
        type,
        items: dishes.filter((dish) => dish.type === type),
      })),
    [dishes],
  );

  const loadDishes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/dishes", { cache: "no-store" });
      const data = await res.json();
      setDishes(Array.isArray(data) ? data : []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDishes();
  }, []);

  if (!session) return <p className="py-10 text-center">Cargando...</p>;
  if (session.user.role !== "ADMIN") {
    return <p className="py-10 text-center font-semibold text-red-500">Acceso solo administradores.</p>;
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage("Selecciona un archivo Excel primero.");
      return;
    }

    setIsUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/dishes/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.error ?? "No se pudo cargar el catalogo.");
        return;
      }

      const result = data as UploadResult;
      setMessage(`Catalogo actualizado: ${result.total} platillos cargados.`);
      setFile(null);
      await loadDishes();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Catalogo de platillos</h2>
        <p className="text-sm text-gray-600">
          Carga un Excel con hojas o columnas llamadas breakfast, lunch, complementos, consomes y desserts.
        </p>
      </div>

      <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <label className="space-y-1 text-sm font-medium text-gray-700">
            Archivo Excel
            <input
              type="file"
              accept=".xlsx,.xls"
              className="block min-h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>
          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
            className="min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isUploading ? "Cargando..." : "Cargar catalogo"}
          </button>
        </div>
        {message && <p className="mt-3 text-sm font-medium text-gray-700">{message}</p>}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {groupedDishes.map(({ type, items }) => (
          <div key={type} className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-gray-900">{catalogTypeLabels[type]}</h3>
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
                {items.length}
              </span>
            </div>
            {isLoading ? (
              <p className="text-sm text-gray-500">Cargando...</p>
            ) : items.length > 0 ? (
              <ul className="max-h-72 space-y-2 overflow-auto text-sm text-gray-700">
                {items.map((dish) => (
                  <li key={dish.id} className="rounded-md bg-gray-50 px-3 py-2">
                    {dish.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Sin platillos cargados.</p>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
