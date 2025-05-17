// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Correo ya registrado" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: role.toUpperCase() as Role // 👈 Usa el rol recibido
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en registro:", error);
    return NextResponse.json({ error: "Error al registrar" }, { status: 500 });
  }
}
