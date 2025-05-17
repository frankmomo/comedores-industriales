import Navbar from "@/components/Navbar";
import MenuCard from "@/components/MenuCard";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a Comedores Industriales</h1>
      <p className="mb-2">Ofrecemos alimentos calientes y balanceados a tu empresa.</p>
      <p className="mb-4">Explora nuestras secciones: quiénes somos, servicios y contacto.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Quiénes somos</h2>
          <p>Somos un equipo comprometido con la nutrición empresarial en Tijuana.</p>
        </div>
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Servicios</h2>
          <p>Comida para empleados, menús balanceados, control nutricional, entrega diaria.</p>
        </div>
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Contacto</h2>
          <p>Escríbenos para cotizar: <a href="mailto:contacto@comedores.com" className="text-blue-600 underline">contacto@comedores.com</a></p>
        </div>
      </div>
    </main>
  );
}
