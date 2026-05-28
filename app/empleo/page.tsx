import Link from "next/link";
import { siteContent } from "@/lib/siteContent";

export default function EmpleoPage() {
  return (
    <main>
      <section className="bg-secondary px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-extrabold">Empleo</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/85">
            Food The Child crece con personas comprometidas con la calidad, la higiene alimentaria, el servicio y el sabor casero.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {siteContent.values.slice(0, 6).map((value) => (
            <div key={value} className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-secondary">{value}</h2>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-md bg-gray-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900">Envianos tu informacion</h2>
          <p className="mt-3 text-gray-700">
            Usa el formulario de contacto y selecciona Vacante como servicio de interes.
          </p>
          <Link
            href="/contacto"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/90"
          >
            Ir a contacto
          </Link>
        </div>
      </section>
    </main>
  );
}
