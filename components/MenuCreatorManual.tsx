"use client";

import { useState } from "react";
import { getWeek } from "@/utils/getWeek";

export function MenuCreatorManual() {
  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
  const dishTypes = ["BREAKFAST", "LUNCH", "COMPLEMENT", "CONSOMME", "DESSERT"];

  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleInput = (day: string, type: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const week = getWeek();
    const year = new Date().getFullYear();
    const userId = 1;

    const daysPayload = days.map((day) => ({
      name: day,
      dishes: dishTypes
        .filter((type) => formData[day]?.[type])
        .map((type, idx) => ({
          id: parseInt(formData[day][type], 10),
          category: type,
          position: idx + 1,
        })),
    }));

    try {
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

      alert("Menu guardado con IDs manuales");
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
            {dishTypes.map((type) => (
              <div key={type} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">{type} ID</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  className="min-h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  onChange={(e) => handleInput(day, type, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSaving}
        className="min-h-11 w-full rounded-md bg-green-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isSaving ? "Guardando..." : "Guardar menu manual"}
      </button>
    </div>
  );
}
