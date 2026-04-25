import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import MenuForm from "./MenuForm";

export default async function AdminMenusPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin");
  }

  const users = await prisma.user.findMany({
    orderBy: { email: "asc" },
  });
  const dishes = await prisma.dishCatalog.findMany({
    orderBy: { name: "asc" },
  });

  return <MenuForm users={users} dishes={dishes} />;
}
