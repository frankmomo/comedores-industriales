import Link from "next/link";
import { siteContent } from "@/lib/siteContent";

export default function Home() {
  return (
    <main>
      <section id="inicio" className="relative min-h-[78vh] overflow-hidden bg-secondary text-white">
        <video
          src={siteContent.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[#022C43]/65" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">{siteContent.hero.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/90 sm:text-xl">{siteContent.hero.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contacto"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-primary/90"
              >
                Solicitar cotizacion
              </Link>
              <Link
                href="/servicios"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary">Food The Child</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">{siteContent.about.title}</h2>
          </div>
          <div className="space-y-6 text-gray-700">
            <p className="text-lg">{siteContent.about.body}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-gray-200 p-4">
                <h3 className="font-bold text-secondary">Mision</h3>
                <p className="mt-2 text-sm leading-6">{siteContent.about.mission}</p>
              </div>
              <div className="rounded-md border border-gray-200 p-4">
                <h3 className="font-bold text-secondary">Vision</h3>
                <p className="mt-2 text-sm leading-6">{siteContent.about.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">Servicios</h2>
            <p className="mt-3 text-gray-600">{siteContent.servicesIntro}</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {siteContent.services.map((service) => (
              <article key={service.title} className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
                <img src={service.image} alt={service.alt} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-secondary">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{service.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Sabor casero a gran escala para impulsar la energia de tu equipo.</h2>
            <p className="mt-3 text-white/80">
              Pide una cotizacion de comedor industrial en Tijuana o servicio de catering.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/90"
          >
            Contactar
          </Link>
        </div>
      </section>
    </main>
  );
}
