import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { week: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const week = parseInt(params.week, 10);
  const year = new Date().getFullYear();

  const menu = await prisma.menu.findFirst({
    where: { week, year },
    include: {
      days: {
        include: {
          dishes: {
            orderBy: { position: "asc" },
          },
        },
        orderBy: { day: "asc" },
      },
    },
  });

  if (!menu) {
    return NextResponse.json({ error: "Menu not found" }, { status: 404 });
  }

  return NextResponse.json(menu);
}
