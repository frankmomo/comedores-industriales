import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Food The Child | Comedor industrial en Tijuana",
  description: "Comedor industrial y servicio de catering en Tijuana con desayunos y comidas frescas para empresas.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
