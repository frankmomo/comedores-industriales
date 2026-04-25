"use client";
import { useState } from "react";
import { DishGroup } from "@prisma/client";

interface Dish {
  id: string;
  name: string;
  group: DishGroup;
}

export default function DishTable({ dishes: initial }: { dishes: Dish[] }) {
  const [dishes, setDishes] = useState(initial);
  const [name, setName] = useState("");
  const [group, setGroup] = useState<DishGroup>(DishGroup.BREAKFAST_MAIN);

  const addDish = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, group }),
    });
    if (res.ok) {
      const newDish = await res.json();
      setDishes([...dishes, newDish]);
      setName("");
      setGroup(DishGroup.BREAKFAST_MAIN);
    } else {
      alert("Error al guardar platillo");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Platillos</h1>
      <form onSubmit={addDish} className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Nombre"
        />
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value as DishGroup)}
          className="border p-2"
        >
          {Object.values(DishGroup).map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Agregar
        </button>
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Grupo</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((d) => (
            <tr key={d.id}>
              <td className="border p-2">{d.name}</td>
              <td className="border p-2">{d.group}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
