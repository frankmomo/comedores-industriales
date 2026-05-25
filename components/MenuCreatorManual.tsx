"use client";
// components/MenuCreatorManual.tsx

import { useState } from "react";
import { getWeek } from "@/utils/getWeek";

export function MenuCreatorManual() {
  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
  const dishTypes = ["BREAKFAST", "LUNCH", "COMPLEMENT", "CONSOMME", "DESSERT"];

  const [formData, setFormData] = useState<any>({});

  const handleInput = (day: string, type: string, value: string) => {
    setFormData(prev => ({
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

    const daysPayload = days.map(day => ({
      name: day,
      dishes: dishTypes
        .filter(type => formData[day]?.[type])
        .map((type, idx) => ({
          id: parseInt(formData[day][type], 10),
          category: type,
          position: idx + 1,
        })),
    }));

    await fetch("/api/admin/menu/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ week, year, userId, days: daysPayload }),
    });
    alert("Menú guardado con IDs manuales");
  };

  return (
    <div className="space-y-4">
      {days.map(day => (
        <div key={day} className="border p-4 rounded">
          <h3 className="font-semibold mb-2">{day}</h3>
          {dishTypes.map(type => (
            <div key={type} className="mb-2">
              <label className="block text-sm font-medium">{type} (ID)</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                onChange={e => handleInput(day, type, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
        Guardar menú manual
      </button>
    </div>
  );
}
