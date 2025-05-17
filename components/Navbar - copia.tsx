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
          { href: "/admin/users", label: "Usuarios", className: "bg-secondary text-white" },
          { href: "/auth/signup", label: "Crear usuario", className: "bg-accent text-secondary" },
        ]
      : [];

  return (
   <header className="sticky top-0 z-50 bg-white shadow-md">
  <nav
    className="
      container mx-auto flex items-center justify-between
      h-24 px-4
    "
  >

        {/* logo */}
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap">
          <Image src="/images/logo.png" alt="Food The Child" width={110} height={110} priority />
        </Link>

        {/* links públicos */}
        <ul className="flex flex-grow justify-center gap-6 items-center">
          {publicLinks.map(({ href, label }) => (
            <li key={href} className="whitespace-nowrap">
              <Link
                href={href}
                className={`
                  menu-link
                  ${pathname === href
                    ? "text-primary menu-link-active"
                    : "text-secondary/80 hover:text-primary"}
                `}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* bloque derecho */}
        <div className="flex items-center gap-4 whitespace-nowrap">
          {adminActions.map(({ href, label, className }) => (
            <Link
              key={href}
              href={href}
             className={`rounded-md px-2 py-0.5 text-xs hover:opacity-90 ${className}`}
            >
              {label}
            </Link>
          ))}

          {session && (
            <span className="hidden sm:inline text-sm text-secondary/70">
              {session.user?.email}
            </span>
          )}

          {session ? (
            <button
              onClick={() => signOut()}
              className="rounded-md bg-primary px-3 py-1 text-white hover:bg-primary/90"
            >
              Salir
            </button>
          ) : (
            <Link
              href="/auth/signin"
              className="rounded-md bg-blue-600 px-4 py-1 text-white hover:bg-blue-700"
            >
              Iniciar&nbsp;sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
