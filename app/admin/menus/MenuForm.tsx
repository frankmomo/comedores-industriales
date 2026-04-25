"use client";
import { useState } from "react";
import { DishGroup, WeekDay } from "@prisma/client";

interface Dish { id: string; name: string; group: DishGroup; }
interface User { id: string; email: string; name: string | null; }
interface DayData {
  breakfast1: string;
  breakfast2: string;
  lunch1: string;
  lunch2: string;
  complement1: string;
  complement2: string;
  consume: string;
  dessert: string;
}

const dayNames: Record<WeekDay, string> = {
  MON: "Lunes",
  TUE: "Martes",
  WED: "Miércoles",
  THU: "Jueves",
  FRI: "Viernes",
};
const days: WeekDay[] = ["MON", "TUE", "WED", "THU", "FRI"];

export default function MenuForm({ users, dishes }: { users: User[]; dishes: Dish[] }) {
  const [author, setAuthor] = useState(users[0]?.id ?? "");
  const [week, setWeek] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());

  const emptyDay: DayData = {
    breakfast1: "",
    breakfast2: "",
    lunch1: "",
    lunch2: "",
    complement1: "",
    complement2: "",
    consume: "",
    dessert: "",
  };
  const [menu, setMenu] = useState<Record<WeekDay, DayData>>({
    MON: { ...emptyDay },
    TUE: { ...emptyDay },
    WED: { ...emptyDay },
    THU: { ...emptyDay },
    FRI: { ...emptyDay },
  });

  const handleChange = (day: WeekDay, field: string, value: string) => {
    setMenu((m) => ({ ...m, [day]: { ...m[day], [field]: value } }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      authorId: author,
      week: Number(week),
      year: Number(year),
      days: days.map((d) => ({
        day: d,
        dishes: [
          menu[d].breakfast1 && { name: getName(menu[d].breakfast1), group: "BREAKFAST_MAIN", position: 1 },
          menu[d].breakfast2 && { name: getName(menu[d].breakfast2), group: "BREAKFAST_MAIN", position: 2 },
          menu[d].lunch1 && { name: getName(menu[d].lunch1), group: "LUNCH_MAIN", position: 1 },
          menu[d].lunch2 && { name: getName(menu[d].lunch2), group: "LUNCH_MAIN", position: 2 },
          menu[d].complement1 && { name: getName(menu[d].complement1), group: "COMPLEMENT" },
          menu[d].complement2 && { name: getName(menu[d].complement2), group: "COMPLEMENT" },
          menu[d].consume && { name: getName(menu[d].consume), group: "CONSUME" },
          menu[d].dessert && { name: getName(menu[d].dessert), group: "DESSERT" },
        ].filter(Boolean),
      })),
    };
    const res = await fetch("/api/menus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      alert("Menú guardado");
    } else {
      alert("Error al guardar menú");
    }
  };

  const getName = (id: string) => dishes.find((d) => d.id === id)?.name || "";
  const options = (group: DishGroup) =>
    dishes.filter((d) => d.group === group);

  return (
    <form onSubmit={submit} className="space-y-4 max-w-full p-4">
      <div className="flex gap-2">
        <select value={author} onChange={(e) => setAuthor(e.target.value)} className="border p-2">
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.email}
            </option>
          ))}
        </select>
        <input type="number" value={week} onChange={(e) => setWeek(parseInt(e.target.value))} className="border p-2 w-20" placeholder="Semana" />
        <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="border p-2 w-24" placeholder="Año" />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">Guardar</button>
      </div>
      <table className="border w-full text-sm">
        <thead>
          <tr>
            <th className="border p-2">Día</th>
            <th className="border p-2">Desayuno 1</th>
            <th className="border p-2">Desayuno 2</th>
            <th className="border p-2">Comida 1</th>
            <th className="border p-2">Comida 2</th>
            <th className="border p-2">Compl. 1</th>
            <th className="border p-2">Compl. 2</th>
            <th className="border p-2">Consomé</th>
            <th className="border p-2">Postre</th>
          </tr>
        </thead>
        <tbody>
          {days.map((d) => (
            <tr key={d}>
              <td className="border p-2 font-semibold">{dayNames[d]}</td>
              <td className="border p-1">
                <select value={menu[d].breakfast1} onChange={(e) => handleChange(d, "breakfast1", e.target.value)} className="w-full">
                  <option value="">-</option>
                  {options("BREAKFAST_MAIN").map((dish) => (
                    <option key={dish.id} value={dish.id}>{dish.name}</option>
                  ))}
                </select>
              </td>
              <td className="border p-1">
                <select value={menu[d].breakfast2} onChange={(e) => handleChange(d, "breakfast2", e.target.value)} className="w-full">
                  <option value="">-</option>
                  {options("BREAKFAST_MAIN").map((dish) => (
                    <option key={dish.id} value={dish.id}>{dish.name}</option>
                  ))}
                </select>
              </td>
              <td className="border p-1">
                <select value={menu[d].lunch1} onChange={(e) => handleChange(d, "lunch1", e.target.value)} className="w-full">
                  <option value="">-</option>
                  {options("LUNCH_MAIN").map((dish) => (
                    <option key={dish.id} value={dish.id}>{dish.name}</option>
                  ))}
                </select>
              </td>
              <td className="border p-1">
                <select value={menu[d].lunch2} onChange={(e) => handleChange(d, "lunch2", e.target.value)} className="w-full">
                  <option value="">-</option>
                  {options("LUNCH_MAIN").map((dish) => (
                    <option key={dish.id} value={dish.id}>{dish.name}</option>
                  ))}
                </select>
              </td>
              <td className="border p-1">
                <select value={menu[d].complement1} onChange={(e) => handleChange(d, "complement1", e.target.value)} className="w-full">
                  <option value="">-</option>
                  {options("COMPLEMENT").map((dish) => (
                    <option key={dish.id} value={dish.id}>{dish.name}</option>
                  ))}
                </select>
              </td>
              <td className="border p-1">
                <select value={menu[d].complement2} onChange={(e) => handleChange(d, "complement2", e.target.value)} className="w-full">
                  <option value="">-</option>
                  {options("COMPLEMENT").map((dish) => (
                    <option key={dish.id} value={dish.id}>{dish.name}</option>
                  ))}
                </select>
              </td>
              <td className="border p-1">
                <select value={menu[d].consume} onChange={(e) => handleChange(d, "consume", e.target.value)} className="w-full">
                  <option value="">-</option>
                  {options("CONSUME").map((dish) => (
                    <option key={dish.id} value={dish.id}>{dish.name}</option>
                  ))}
                </select>
              </td>
              <td className="border p-1">
                <select value={menu[d].dessert} onChange={(e) => handleChange(d, "dessert", e.target.value)} className="w-full">
                  <option value="">-</option>
                  {options("DESSERT").map((dish) => (
                    <option key={dish.id} value={dish.id}>{dish.name}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}
