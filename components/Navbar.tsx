"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Navbar responsive: mantiene la lógica original (roles, sesión, rutas) y agrega
 * un menú hamburgesa lateral en móvil (< md).
 * - Color base #022C43 (bg-primary) para coherencia con sitio.
 * - Dependencias: lucide-react (iconos) y framer-motion (animación deslizable).
 */
export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role;
  const [open, setOpen] = useState(false);

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

  /** Cierra el panel móvil cuando se navega a otra ruta */
  const handleNavigate = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#022C43] shadow-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-6 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap">
          <Image
            src="/images/logo.png"
            alt="Food The Child"
            width={60}
            height={60}
            priority
          />
          <div className="leading-4 hidden sm:block">
            <p className="text-sm font-bold text-white">FOOD THE CHILD</p>
            <span className="text-[10px] text-orange-400">Industrial Dining Service</span>
          </div>
        </Link>

        {/* Nav links (desktop) */}
        <ul className="hidden md:flex items-center gap-8 text-lg font-medium text-white">
          {publicLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`transition ${
							'${pathname === href ? "text-orange-400 font-semibold" : "hover:text-orange-300"}'
						}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right section (desktop) */}
        <div className="hidden md:flex items-center gap-4 whitespace-nowrap">
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
            <span className="text-sm text-white/70">{session.user?.email}</span>
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

        {/* Hamburger (mobile) */}
        <button
          className="text-white md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile slide-over */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-y-0 right-0 w-72 bg-[#022C43] text-white shadow-lg md:hidden"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <span className="text-lg font-semibold">Menú</span>
              <button aria-label="Cerrar menú" onClick={() => setOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-4 px-6 py-4 text-base font-medium">
              {publicLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={handleNavigate}
                  className={`rounded-lg px-2 py-2 ${
										'${pathname === href ? "bg-orange-400/20" : "hover:bg-white/10"}'
									}`}
                >
                  {label}
                </Link>
              ))}

              {adminActions.length > 0 && (
                <div className="pt-2 border-t border-white/20">
                  {adminActions.map(({ href, label, className }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={handleNavigate}
                      className={`mt-2 block rounded-lg px-2 py-2 text-center text-sm ${className}`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Session info & sign in/out */}
              <div className="mt-6 border-t border-white/20 pt-4">
                {session && (
                  <p className="mb-2 text-xs text-white/70">{session.user?.email}</p>
                )}

                {session ? (
                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut();
                    }}
                    className="w-full rounded-md bg-orange-400 px-4 py-2 text-center font-semibold hover:bg-orange-500"
                  >
                    Salir
                  </button>
                ) : (
                  <Link
                    href="/auth/signin"
                    onClick={handleNavigate}
                    className="block w-full rounded-md bg-orange-400 px-4 py-2 text-center font-semibold hover:bg-orange-500"
                  >
                    Iniciar sesión
                  </Link>
                )}
              </div>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
