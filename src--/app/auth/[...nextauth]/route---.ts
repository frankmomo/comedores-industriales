// src/app/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth";

// Exponemos GET y POST para todas las sub-rutas de /auth/*
export const { GET, POST } = handlers;
