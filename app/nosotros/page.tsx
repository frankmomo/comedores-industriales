"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Heart,
  Users,
  Shield,
  Eye,
  Lightbulb,
  Leaf,
  UserCheck,
} from "lucide-react";

const valores = [
  { icon: <ShieldCheck size={28} />, label: "Calidad sin concesiones" },
  { icon: <Heart size={28} />, label: "Pasión por el sabor casero" },
  { icon: <Users size={28} />, label: "Servicio centrado en la gente" },
  { icon: <Shield size={28} />, label: "Seguridad e higiene alimentaria" },
  { icon: <Eye size={28} />, label: "Transparencia y honestidad" },
  { icon: <Lightbulb size={28} />, label: "Innovación continua" },
  { icon: <Leaf size={28} />, label: "Responsabilidad social y ambiental" },
  { icon: <UserCheck size={28} />, label: "Trabajo en equipo" },
];

export default function Nosotros() {
  return (
    <main className="space-y-24">
      {/* HERO */}
      <section className="relative isolate h-[60vh] flex items-center justify-center overflow-hidden bg-[#022C43]">
        <Image
          src="/images/about-hero.jpg"
          alt="Equipo en cocina industrial"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Conócenos
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl">
            Más que comida: somos un equipo comprometido con llevar sabor casero
            saludable a tu empresa.
          </p>
        </div>
      </section>

      {/* MISIÓN & VISIÓN */}
      <section className="container mx-auto px-4 grid gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-primary">Misión</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Brindar <strong>alimentos saludables con auténtico sabor casero</strong>
            , garantizando calidad, higiene certificada y un servicio flexible
            que inspire confianza. Fomentamos relaciones sólidas con clientes,
            proveedores, colaboradores y comunidad para asegurar rentabilidad y
            crecimiento conjunto.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-primary">Visión</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Ser la <strong>opción preferida y líder en comedores industriales </strong>
            del noroeste de México, reconocidos por menús nutritivos, procesos
            impecables y la satisfacción diaria de nuestros comensales.
          </p>
        </motion.div>
      </section>

      {/* VALORES */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-12">
            Nuestros valores
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map(({ icon, label }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="group rounded-3xl bg-white/70 backdrop-blur-md p-6 shadow-md ring-1 ring-gray-200 hover:-translate-y-2 hover:shadow-lg transition transform"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition">
                  {icon}
                </div>
                <p className="font-semibold text-gray-800 group-hover:text-primary-700">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Decoración de fondo */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/texture.svg')] opacity-50" />
      </section>

      {/* EQUIPO */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Nuestro equipo
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Chef Laura", role: "Chef Ejecutiva", img: "/images/team1.jpg" },
            { name: "Ing. Carlos", role: "Operaciones", img: "/images/team2.jpg" },
            { name: "Lic. Marisol", role: "Nutrióloga", img: "/images/team3.jpg" },
          ].map(({ name, role, img }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="text-center"
            >
              <Image
                src={img}
                alt={name}
                width={200}
                height={200}
                className="mx-auto rounded-full object-cover shadow-lg"
              />
              <p className="mt-4 font-semibold text-gray-800">{name}</p>
              <p className="text-sm text-gray-500">{role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            ¿Listo para ofrecer un menú memorable a tu equipo?
          </h2>
          <p className="max-w-2xl mx-auto text-white/90">
            Hablemos sobre cómo Food The Child puede transformar la experiencia
            gastronómica en tu empresa.
          </p>
          <a
            href="/contacto"
            className="inline-block rounded-xl bg-orange-400 px-8 py-3 font-semibold shadow hover:bg-orange-500"
          >
            Solicitar cotización
          </a>
        </div>
      </section>
    </main>
  );
}
// Este código es un componente de Next.js que representa la página "Nosotros" de un sitio web.
// La página incluye secciones para la misión, visión y valores de la empresa, así como un equipo destacado.