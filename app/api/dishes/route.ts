import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { exampleDishes } from "@/lib/dishCatalog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dishes = await prisma.catalogDish.findMany({
      where: { active: true },
      orderBy: [{ type: "asc" }, { name: "asc" }],
      select: { id: true, name: true, type: true },
    });

    if (dishes.length > 0) {
      return NextResponse.json(dishes);
    }
  } catch (error) {
    console.warn("Using example dishes because the catalog table is unavailable.", error);
  }

  return NextResponse.json(exampleDishes);
}
