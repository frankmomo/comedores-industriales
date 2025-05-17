//import Navbar from "@/components/Navbar";
import MenuCard from "@/components/MenuCard";

export default function Home() {
  /* Ejemplo estático; pronto conectarás con BD */
  const sampleMenu = [
    {
      title: "Milanesa de pollo empanizada",
      img: "/images/milanesa.jpg",
      side1: "Arroz rojo",
      side2: "Frijoles de la olla",
    },
    {
      title: "Tacos dorados de papa",
      img: "/images/tacos.jpg",
      side1: "Ensalada de col",
      side2: "Consomé",
    },
    {
      title: "Carne asada al carbón",
      img: "/images/carne-asada.jpg",
      side1: "Guacamole",
      side2: "Frijoles charros",
    },
  ];

  return (
    <>
    {/*  <Navbar />*/}

      {/* HERO */}
      <section className="relative flex h-[60vh] items-center justify-center overflow-hidden bg-secondary">
        <video
          src="/videos/kitchen.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-lg text-center text-white">
          <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
            Sabor casero a gran escala
          </h1>
          <p className="mb-6 text-lg font-light">
            Desayunos y comidas frescas para tu equipo, todos los días.
          </p>
          <a
            href="#menu"
            className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-md"
          >
            Ver menú de hoy
          </a>
        </div>
      </section>

      {/* MENÚ DESTACADO */}
      <section id="menu" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-secondary">
          Opciones de hoy
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sampleMenu.map((item) => (
            <MenuCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary py-8 text-center text-white">
        © {new Date().getFullYear()} Comedor Industrial · Tijuana
      </footer>
    </>
  );
}
