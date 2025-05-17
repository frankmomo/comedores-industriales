// app/api/roles/route.ts
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function GET() {
  // Convierte enum Role en arreglo de strings
  const roles = Object.values(Role);
  return NextResponse.json(roles);
}
