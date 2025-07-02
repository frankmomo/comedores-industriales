// app/admin/users/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import UserTable from "./UserTable";

export default async function AdminUserPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/auth/signin");
  }

  const users = await prisma.user.findMany({
    orderBy: { email: "asc" }
  });

  return <UserTable users={users} />;
}
