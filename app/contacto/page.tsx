import { siteContent } from "@/lib/siteContent";

export default function ContactoPage() {
  return (
    <main>
      <section className="bg-secondary px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-extrabold">Contacto</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/85">
            Pide una cotizacion de comedor industrial en Tijuana o servicio de catering.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <div className="space-y-4">
          <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-secondary">Datos de contacto</h2>
            <dl className="mt-4 space-y-3 text-gray-700">
              <div>
                <dt className="font-semibold">Telefono / WhatsApp</dt>
                <dd>
                  <a href={siteContent.phoneHref} className="text-primary hover:underline">
                    {siteContent.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Correo</dt>
                <dd>
                  <a href={siteContent.emailHref} className="text-primary hover:underline">
                    {siteContent.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Direccion</dt>
                <dd>{siteContent.address}</dd>
              </div>
              <div>
                <dt className="font-semibold">Horario</dt>
                <dd>{siteContent.hours}</dd>
              </div>
            </dl>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img src="https://www.foodthechild.com.mx/assets/badge1.png" alt="Registro REPSE" className="rounded-md border border-gray-200 bg-white p-3" />
            <img src="https://www.foodthechild.com.mx/assets/badge2.png" alt="Cumplimiento NOM" className="rounded-md border border-gray-200 bg-white p-3" />
          </div>
        </div>

        <form className="rounded-md border border-gray-200 bg-white p-5 shadow-sm" action={siteContent.emailHref}>
          <h2 className="text-xl font-bold text-secondary">Solicitar cotizacion</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="space-y-1 text-sm font-medium text-gray-700">
              Nombre*
              <input className="min-h-11 w-full rounded-md border border-gray-300 px-3 py-2" name="nombre" required />
            </label>
            <label className="space-y-1 text-sm font-medium text-gray-700">
              Empresa
              <input className="min-h-11 w-full rounded-md border border-gray-300 px-3 py-2" name="empresa" />
            </label>
            <label className="space-y-1 text-sm font-medium text-gray-700">
              Telefono / WhatsApp*
              <input className="min-h-11 w-full rounded-md border border-gray-300 px-3 py-2" name="telefono" required />
            </label>
            <label className="space-y-1 text-sm font-medium text-gray-700">
              Correo*
              <input className="min-h-11 w-full rounded-md border border-gray-300 px-3 py-2" name="correo" type="email" required />
            </label>
            <label className="space-y-1 text-sm font-medium text-gray-700 sm:col-span-2">
              Servicio de interes*
              <select className="min-h-11 w-full rounded-md border border-gray-300 px-3 py-2" name="servicio" required>
                <option>Comedor industrial</option>
                <option>Box-Lunch</option>
                <option>Eventos corporativos</option>
                <option>Vacante</option>
              </select>
            </label>
            <label className="space-y-1 text-sm font-medium text-gray-700 sm:col-span-2">
              Mensaje*
              <textarea className="min-h-32 w-full rounded-md border border-gray-300 px-3 py-2" name="mensaje" required />
            </label>
          </div>
          <button type="submit" className="mt-4 min-h-11 rounded-md bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary/90">
            Enviar mensaje
          </button>
        </form>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-md border border-gray-200">
          <iframe src={siteContent.mapSrc} className="h-80 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </main>
  );
}
