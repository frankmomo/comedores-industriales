import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// ✔ Solo verifica que exista un JWT; no usa Prisma ni withAuth
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // Página de inicio de sesión en NextAuth v5
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.url); // volver al menú tras login
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/menu/:path*"], // protege /menu y subrutas
};
