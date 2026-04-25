import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import DishTable from "./DishTable";

export default async function AdminDishesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin");
  }

  const dishes = await prisma.dishCatalog.findMany({
    orderBy: { name: "asc" },
  });

  return <DishTable dishes={dishes} />;
}
