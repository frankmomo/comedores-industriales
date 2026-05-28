import Link from "next/link";
import { siteContent } from "@/lib/siteContent";

export default function ServiciosPage() {
  return (
    <main>
      <section className="bg-secondary px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-extrabold">Servicios</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/85">{siteContent.servicesIntro}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        {siteContent.services.map((service) => (
          <article key={service.title} className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
            <img src={service.image} alt={service.alt} className="h-56 w-full object-cover" />
            <div className="p-5">
              <h2 className="text-xl font-bold text-secondary">{service.title}</h2>
              <p className="mt-3 leading-6 text-gray-700">{service.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900">Preguntas frecuentes</h2>
          <div className="mt-6 space-y-4">
            {siteContent.faq.map((item) => (
              <article key={item.question} className="rounded-md border border-gray-200 bg-white p-5">
                <h3 className="font-bold text-secondary">{item.question}</h3>
                <p className="mt-2 text-gray-700">{item.answer}</p>
              </article>
            ))}
          </div>
          <Link
            href="/contacto"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/90"
          >
            Solicitar cotizacion
          </Link>
        </div>
      </section>
    </main>
  );
}
