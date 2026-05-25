import { getWeeklyMenu } from "@/prisma/queries/getWeeklyMenu";

export default async function handler(req, res) {
  const { week } = req.query;
  const userId = req.session.user.id; // Suponiendo que tienes autenticación
  const year = new Date().getFullYear();

  const menu = await getWeeklyMenu(userId, parseInt(week), year);
  if (!menu) return res.status(404).json({ error: "No menu found" });

  res.json(menu);
}
