"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role;
  const [isOpen, setIsOpen] = useState(false);

  const publicLinks = [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/servicios", label: "Servicios" },
    { href: "/empleo", label: "Empleo" },
    { href: "/menu", label: "Menu semanal" },
    { href: "/contacto", label: "Contacto" },
  ];

  const adminActions =
    role === "ADMIN"
      ? [
          {
            href: "/admin/menu/create",
            label: "Crear menu",
            className: "bg-orange-400 text-white",
          },
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

  const closeMenu = () => setIsOpen(false);

  const linkClass = (href: string) =>
    `block rounded-md px-3 py-2 transition ${
      pathname === href ? "bg-white/10 text-orange-300 font-semibold" : "text-white hover:bg-white/10 hover:text-orange-200"
    }`;

  const renderAuthAction = (isMobile = false) =>
    session ? (
      <button
        onClick={() => {
          closeMenu();
          signOut();
        }}
        className={`rounded-md bg-orange-400 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-orange-500 ${
          isMobile ? "w-full" : "py-1"
        }`}
      >
        Salir
      </button>
    ) : (
      <Link
        href="/auth/signin"
        onClick={closeMenu}
        className={`rounded-md bg-orange-400 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-orange-500 ${
          isMobile ? "block w-full" : "py-1"
        }`}
      >
        Iniciar sesion
      </Link>
    );

  return (
    <header className="sticky top-0 z-50 bg-[#022C43] shadow-md">
      <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" onClick={closeMenu} className="flex min-w-0 items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Food The Child"
              width={52}
              height={52}
              priority
              className="h-12 w-12 shrink-0"
            />
            <div className="min-w-0 leading-4">
              <p className="truncate text-sm font-bold text-white">FOOD THE CHILD</p>
              <span className="block truncate text-[10px] text-orange-400">
                Industrial Dining Service
              </span>
            </div>
          </Link>

          <ul className="hidden items-center gap-2 text-sm font-medium text-white lg:flex">
            {publicLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={linkClass(href)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 whitespace-nowrap lg:flex">
            {adminActions.map(({ href, label, className }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-md px-3 py-1 text-xs font-semibold hover:opacity-90 ${className}`}
              >
                {label}
              </Link>
            ))}

            {session && (
              <span className="max-w-40 truncate text-sm text-white/70">
                {session.user?.email}
              </span>
            )}

            {renderAuthAction()}
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/20 text-white hover:bg-white/10 lg:hidden"
          >
            <span className="sr-only">{isOpen ? "Cerrar menu" : "Abrir menu"}</span>
            <span className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-6 bg-current transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-6 bg-current transition ${isOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 bg-current transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

        {isOpen && (
          <div className="mt-3 space-y-3 rounded-md border border-white/10 bg-[#022C43] pb-3 lg:hidden">
            <ul className="space-y-1 px-2 pt-2 text-base font-medium">
              {publicLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} onClick={closeMenu} className={linkClass(href)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {adminActions.length > 0 && (
              <div className="grid gap-2 border-t border-white/10 px-3 pt-3">
                {adminActions.map(({ href, label, className }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className={`rounded-md px-3 py-2 text-center text-sm font-semibold hover:opacity-90 ${className}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}

            <div className="border-t border-white/10 px-3 pt-3">
              {session && (
                <p className="mb-2 truncate text-center text-xs text-white/70">
                  {session.user?.email}
                </p>
              )}
              {renderAuthAction(true)}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
