"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
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
    { href: "/contacto", label: "Contacto" },
  ];

  const systemLinks = [
    { href: "/empleo", label: "Empleo" },
    { href: "/menu", label: "Menu semanal" },
  ];

  const adminActions =
    role === "ADMIN"
      ? [
          { href: "/admin/menu/create", label: "Crear menu", className: "bg-primary text-white" },
          { href: "/admin/dishes", label: "Catalogo", className: "bg-white text-secondary" },
          { href: "/admin/users", label: "Usuarios", className: "bg-secondary text-white" },
          { href: "/auth/signup", label: "Crear usuario", className: "bg-accent text-secondary" },
        ]
      : [];

  const closeMenu = () => setIsOpen(false);

  const linkClass = (href: string) =>
    `rounded-md px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 ${
      pathname === href ? "bg-white/10 text-orange-200" : ""
    }`;

  const renderAuthAction = (mobile = false) =>
    session ? (
      <button
        type="button"
        onClick={() => {
          closeMenu();
          signOut();
        }}
        className={`rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90 ${
          mobile ? "w-full" : ""
        }`}
      >
        Salir
      </button>
    ) : (
      <Link
        href="/auth/signin"
        onClick={closeMenu}
        className={`rounded-md bg-primary px-4 py-2 text-center text-sm font-bold text-white hover:bg-primary/90 ${
          mobile ? "block w-full" : ""
        }`}
      >
        Iniciar sesion
      </Link>
    );

  const renderLinks = () => (
    <>
      {[...publicLinks, ...systemLinks].map(({ href, label }) => (
        <Link key={href} href={href} onClick={closeMenu} className={linkClass(href)}>
          {label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-[#0c3950] text-white">
      <div className="mx-auto flex w-[min(1120px,92%)] items-center justify-between py-3">
        <Link href="/" onClick={closeMenu} className="flex min-w-0 items-center gap-3 text-white no-underline">
          <Image
            src="/assets/logo.png"
            alt="Food The Child - Comedor industrial en Tijuana"
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-full bg-white object-contain"
          />
          <div className="min-w-0 leading-none">
            <strong className="block truncate text-sm">FOOD THE CHILD</strong>
            <span className="mt-1 block truncate text-[11px] text-white/80">Comedor industrial en Tijuana</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">{renderLinks()}</nav>

        <div className="hidden items-center gap-2 whitespace-nowrap lg:flex">
          {adminActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`rounded-md px-3 py-1 text-xs font-bold hover:opacity-90 ${action.className}`}
            >
              {action.label}
            </Link>
          ))}
          {session && <span className="max-w-36 truncate text-xs text-white/70">{session.user?.email}</span>}
          {renderAuthAction()}
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="flex flex-col gap-1 border-0 bg-transparent p-2 lg:hidden"
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-x-0 top-[64px] z-50 bg-[#0c3950] px-4 pb-5 lg:hidden">
          <nav className="mx-auto grid w-[min(1120px,92%)] gap-2 py-3">{renderLinks()}</nav>
          {adminActions.length > 0 && (
            <div className="mx-auto grid w-[min(1120px,92%)] gap-2 border-t border-white/10 pt-3">
              {adminActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  onClick={closeMenu}
                  className={`rounded-md px-3 py-2 text-center text-sm font-bold ${action.className}`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          )}
          <div className="mx-auto mt-3 w-[min(1120px,92%)] border-t border-white/10 pt-3">
            {session && <p className="mb-2 truncate text-center text-xs text-white/70">{session.user?.email}</p>}
            {renderAuthAction(true)}
          </div>
        </div>
      )}
    </header>
  );
}
