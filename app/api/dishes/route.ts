import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DishGroup } from "@prisma/client";

export async function GET() {
  const dishes = await prisma.dishCatalog.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(dishes);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { name, group } = await req.json();
  if (!name || !group) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }
  const dish = await prisma.dishCatalog.create({
    data: {
      name,
      group: group as DishGroup,
    },
  });
  return NextResponse.json(dish, { status: 201 });
}
