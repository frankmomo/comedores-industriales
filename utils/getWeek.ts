export const getWeek = (d: Date = new Date()): number => {
  const tmp = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day   = tmp.getUTCDay() || 7;    // lun-dom 1–7
  tmp.setUTCDate(tmp.getUTCDate() + 4 - day);
  const start = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  return Math.ceil(((tmp.getTime() - start.getTime()) / 86400000 + 1) / 7);
};
