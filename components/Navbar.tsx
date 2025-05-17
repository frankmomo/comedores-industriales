"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role;

  const publicLinks = [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/servicios", label: "Servicios" },
    { href: "/empleo", label: "Empleo" },
    { href: "/menu", label: "Menú semanal" },
    { href: "/contacto", label: "Contacto" },
  ];

  const adminActions =
    role === "ADMIN"
      ? [
          {
            href: "/admin/users",
            label: "Usuarios",
            className: "bg-secondary text-white",
          },
          {
            href: "/auth/signup",
            label: "Crear usuario",
            className: "bg-accent text-secondary",
          },
        ]
      : [];

  return (
    <header className="sticky top-0 z-50 bg-[#022C43] shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap">
          <Image
            src="/images/logo.png"
            alt="Food The Child"
            width={60}
            height={60}
            priority
          />
          <div className="leading-4">
            <p className="text-sm text-white font-bold">FOOD THE CHILD</p>
            <span className="text-[10px] text-orange-400">
              Industrial Dining Service
            </span>
          </div>
        </Link>

        {/* Menú principal */}
        <ul className="flex gap-8 items-center text-lg font-medium text-white">
          {publicLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`transition ${
                  pathname === href
                    ? "text-orange-400 font-semibold"
                    : "hover:text-orange-300"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sección derecha */}
        <div className="flex items-center gap-4 whitespace-nowrap">
          {adminActions.map(({ href, label, className }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-2 py-1 text-xs hover:opacity-90 ${className}`}
            >
              {label}
            </Link>
          ))}

          {session && (
            <span className="hidden sm:inline text-sm text-white/70">
              {session.user?.email}
            </span>
          )}

          {session ? (
            <button
              onClick={() => signOut()}
              className="rounded-md bg-orange-400 px-4 py-1 text-white hover:bg-orange-500"
            >
              Salir
            </button>
          ) : (
            <Link
              href="/auth/signin"
              className="rounded-md bg-orange-400 px-4 py-1 text-white hover:bg-orange-500"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
