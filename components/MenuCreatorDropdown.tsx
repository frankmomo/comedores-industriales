"use client";
import { useEffect, useState } from "react";
import { getWeek } from "@/utils/getWeek";

export function MenuCreatorDropdown() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [menu, setMenu] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dishes")
      .then((res) => res.json())
      .then(setDishes)
      .finally(() => setIsLoading(false));
  }, []);

  const dishTypes = ["BREAKFAST", "LUNCH", "COMPLEMENT", "CONSOMME", "DESSERT"];
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
    const week = getWeek();
    const year = new Date().getFullYear();
    const userId = 1;

    const daysPayload = days.map((day) => ({
      name: day,
      dishes: dishTypes
        .filter((type) => menu[day]?.[type])
        .map((type, idx) => ({
          id: parseInt(menu[day][type], 10),
          category: type,
          position: idx + 1,
        })),
    }));

    const res = await fetch("/api/admin/menu/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ week, year, userId, days: daysPayload }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      alert(data?.error ?? "No se pudo guardar el menu");
      return;
    }

    alert("Menu creado exitosamente");
  };

  return (
    <div className="space-y-4">
      {days.map((day) => (
        <div key={day} className="border p-4 rounded">
          <h3 className="font-semibold mb-2">{day}</h3>
          {dishTypes.map((type) => (
            <div key={type} className="mb-2">
              <label className="block text-sm font-medium">{type}</label>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => handleChange(day, type, e.target.value)}
              >
                <option value="">
                  {isLoading ? "Cargando platillos..." : "Selecciona platillo"}
                </option>
                {dishes
                  .filter((dish) => dish.type === type)
                  .map((dish) => (
                    <option key={dish.id} value={dish.id}>
                      {dish.name}
                    </option>
                  ))}
              </select>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Guardar menu semanal
      </button>
    </div>
  );
}
