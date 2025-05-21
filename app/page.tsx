"use client";

import CountUp from "react-countup";
import Link from "next/link";
import MenuCard from "@/components/MenuCard";



// Puedes ajustar estos valores cuando tengas datos reales
const stats = [
  { label: "Comidas diarias", value: 500, suffix: "+" },
  { label: "Años de experiencia", value: 10, suffix: "" },
  { label: "Satisfacción", value: 95, suffix: "%" },
];

export default function Home() {
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
      {/* HERO */}
      <section className="relative isolate h-[90vh] flex items-center overflow-hidden">
        {/* Video de fondo */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/kitchen.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Overlay para asegurar contraste */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Contenido centrado */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Sabor casero <br className="hidden md:block" /> a gran escala
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-2xl">
            Desayunos y comidas frescas para tu equipo, todos los días
          </p>

          {/* CTA principal */}
          <Link
            href="/contacto"
            className="inline-block mt-8 rounded-2xl bg-rose-600 px-8 py-3 text-lg font-semibold shadow-lg transition hover:bg-rose-500"
          >
            Solicitar cotización
          </Link>

          {/* Contadores animados */}
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map(({ label, value, suffix }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold">
                  <CountUp end={value} duration={1.5} />
                  {suffix}
                </span>
                <span className="mt-1 text-sm uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      {
      /* Aquí continúa tu contenido existente (Opciones de hoy, etc.) */}
      <section id="hoy" className="py-12">
        {<h2 className="mb-10 text-center text-3xl font-bold text-secondary">
          Opciones de hoy
        </h2>}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {sampleMenu.map((item) => (
                    <MenuCard key={item.title} {...item} />
                  ))}
                </div>
      </section>

      {/* Footer (sin cambios) */}
    </>
  );
}
