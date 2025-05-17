// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";


export const metadata = {
  title: "Comedor Industrial",
  description: "Menús frescos para tu equipo",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <html lang="es">
      {/* ⬇️ Todo el árbol irá dentro de <Providers> */}
      <body>
        <Providers>
          {/* -------------- NAVBAR -------------- */}
          <Navbar />

          {/* -------------- CONTENIDO -------------- */}
          {children}
        </Providers>
      </body>
    </html>
  );
}