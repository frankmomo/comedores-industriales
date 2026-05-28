import { siteContent } from "@/lib/siteContent";
import { FoodTheChildFooter } from "@/components/FoodTheChildFooter";

export default function ContactoPage() {
  return (
    <main className="ftc-public">
      <section id="contacto" className="section">
        <div className="container contact">
          <header className="section-head reveal in">
            <h1>Contacto</h1>
            <p>Pide una cotizacion de comedor industrial en Tijuana o servicio de catering.</p>
          </header>

          <div className="contact-grid">
            <form className="card form reveal in" action={siteContent.emailHref}>
              <label>
                Nombre*
                <input name="nombre" required autoComplete="name" />
              </label>
              <label>
                Empresa
                <input name="empresa" autoComplete="organization" />
              </label>
              <label>
                Telefono / WhatsApp*
                <input name="telefono" required inputMode="tel" autoComplete="tel" />
              </label>
              <label>
                Correo*
                <input name="correo" type="email" required autoComplete="email" />
              </label>

              <label>
                Servicio de interes*
                <select name="servicio" required>
                  <option value="Comedor industrial">Comedor industrial</option>
                  <option value="Box-Lunch">Box-Lunch</option>
                  <option value="Eventos corporativos">Eventos corporativos</option>
                  <option value="Reclutamiento">Vacante</option>
                </select>
              </label>

              <label>
                Mensaje*
                <textarea name="mensaje" required />
              </label>

              <button className="btn btn-full" type="submit">
                Enviar mensaje
              </button>
            </form>

            <div className="card info reveal in">
              <ul className="list">
                <li>
                  <strong>Tel:</strong>{" "}
                  <a href={siteContent.phoneHref} rel="nofollow noopener">
                    {siteContent.phone}
                  </a>
                </li>
                <li>
                  <strong>Correo:</strong>{" "}
                  <a href={siteContent.emailHref} rel="nofollow noopener">
                    {siteContent.email}
                  </a>
                </li>
                <li>
                  <strong>Direccion:</strong> {siteContent.address}
                </li>
                <li>
                  <strong>Horario:</strong> {siteContent.hours}
                </li>
              </ul>
              <div className="badges">
                <img src="/assets/badge1.png" alt="Registro REPSE" loading="lazy" decoding="async" />
                <img src="/assets/badge2.png" alt="Cumplimiento NOM" loading="lazy" decoding="async" />
              </div>
              <div className="map-wrap">
                <iframe
                  title="Ubicacion de Food The Child en Tijuana"
                  src={siteContent.mapSrc}
                  width="600"
                  height="450"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <FoodTheChildFooter />
    </main>
  );
}
