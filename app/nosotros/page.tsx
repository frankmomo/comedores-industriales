import { siteContent } from "@/lib/siteContent";

export default function NosotrosPage() {
  return (
    <main className="bg-white">
      <section className="bg-secondary px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-wide text-orange-300">Food The Child</p>
          <h1 className="mt-2 text-4xl font-extrabold">Quienes somos</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/85">{siteContent.about.body}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8">
        <article className="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary">Mision</h2>
          <p className="mt-3 leading-7 text-gray-700">{siteContent.about.mission}</p>
        </article>
        <article className="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary">Vision</h2>
          <p className="mt-3 leading-7 text-gray-700">{siteContent.about.vision}</p>
        </article>
      </section>

      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900">Nuestros valores</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {siteContent.values.map((value) => (
              <div key={value} className="rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700">
                {value}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
