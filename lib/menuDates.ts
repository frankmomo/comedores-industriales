const monthNames = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

function toLocalDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getCurrentWeekRange() {
  const now = new Date();
  const day = now.getDay() || 7;
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(now.getDate() - day + 1);

  const end = new Date(start);
  end.setDate(start.getDate() + 4);

  return {
    startDate: toLocalDateInputValue(start),
    endDate: toLocalDateInputValue(end),
  };
}

export function buildMenuName(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();

  if (sameMonth && sameYear) {
    return `Menu semana del ${start.getDate()} al ${end.getDate()} de ${
      monthNames[end.getMonth()]
    } del ${end.getFullYear()}`;
  }

  if (sameYear) {
    return `Menu semana del ${start.getDate()} de ${monthNames[start.getMonth()]} al ${end.getDate()} de ${
      monthNames[end.getMonth()]
    } del ${end.getFullYear()}`;
  }

  return `Menu semana del ${start.getDate()} de ${monthNames[start.getMonth()]} del ${start.getFullYear()} al ${end.getDate()} de ${
    monthNames[end.getMonth()]
  } del ${end.getFullYear()}`;
}
