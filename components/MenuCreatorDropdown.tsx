"use client";
import { useEffect, useState } from "react";
import { getWeek } from "@/utils/getWeek";
import { CatalogDishItem, CatalogDishType } from "@/lib/dishCatalog";

type MenuMeta = {
  menuName: string;
  startDate: string;
  endDate: string;
};

export function MenuCreatorDropdown({ menuMeta }: { menuMeta: MenuMeta }) {
  const [dishes, setDishes] = useState<CatalogDishItem[]>([]);
  const [menu, setMenu] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/dishes")
      .then((res) => res.json())
      .then(setDishes)
      .finally(() => setIsLoading(false));
  }, []);

  const dishFields = [
    { key: "BREAKFAST", label: "Breakfast", type: "BREAKFAST", category: "BREAKFAST", position: 1 },
    { key: "LUNCH", label: "Lunch", type: "LUNCH", category: "LUNCH", position: 1 },
    { key: "COMPLEMENT_1", label: "Complement 1", type: "COMPLEMENT", category: "COMPLEMENT", position: 1 },
    { key: "COMPLEMENT_2", label: "Complement 2", type: "COMPLEMENT", category: "COMPLEMENT", position: 2 },
    { key: "CONSOMME", label: "Consomme", type: "CONSOMME", category: "CONSOMME", position: null },
    { key: "DESSERT", label: "Dessert", type: "DESSERT", category: "DESSERT", position: null },
  ];
  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

  const handleChange = (day: string, type: string, value: string) => {
    setMenu((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const menuStart = new Date(`${menuMeta.startDate}T00:00:00`);
    const week = getWeek(menuStart);
    const year = menuStart.getFullYear();
    const userId = 1;

    const daysPayload = days.map((day) => ({
      name: day,
      dishes: dishFields
        .filter((field) => String(menu[day]?.[field.key] ?? "").trim())
        .map((field) => ({
          id: dishes.find(
            (dish) =>
              dish.type === field.type &&
              dish.name.trim().toLowerCase() === String(menu[day][field.key]).trim().toLowerCase(),
          )?.id,
          name: String(menu[day][field.key]).trim(),
          type: field.type,
          category: field.category,
          position: field.position,
        })),
    }));

    try {
      const res = await fetch("/api/admin/menu/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ week, year, userId, ...menuMeta, days: daysPayload }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(data?.error ?? "No se pudo guardar el menu");
        return;
      }

      alert("Menu creado exitosamente");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {days.map((day) => (
        <div key={day} className="rounded-md border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
          <h3 className="mb-3 text-base font-semibold text-gray-900">{day}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {dishFields.map((field) => (
              <div key={field.key} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type="text"
                  list={`dish-options-${day}-${field.key}`}
                  value={menu[day]?.[field.key] ?? ""}
                  placeholder={isLoading ? "Cargando platillos..." : "Escribe o selecciona platillo"}
                  className="min-h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onChange={(e) => handleChange(day, field.key, e.target.value)}
                />
                <datalist id={`dish-options-${day}-${field.key}`}>
                  {dishes
                    .filter((dish) => dish.type === (field.type as CatalogDishType))
                    .map((dish) => (
                      <option key={dish.id} value={dish.name} />
                    ))}
                </datalist>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSaving}
        className="min-h-11 w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isSaving ? "Guardando..." : "Guardar menu semanal"}
      </button>
    </div>
  );
}
