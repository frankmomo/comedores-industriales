import { siteContent } from "@/lib/siteContent";
import { FoodTheChildFooter } from "@/components/FoodTheChildFooter";

export default function Home() {
  return (
    <main className="ftc-public">
      <section id="inicio" className="hero" aria-label="Comedor industrial y servicio de catering">
        <div className="overlay" aria-hidden="true" />
        <div className="container hero-inner">
          <h1>
            Comedor industrial y <br /> servicio de catering en Tijuana
          </h1>
          <p>{siteContent.hero.body}</p>
          <a href="/contacto" className="btn" aria-label="Solicitar cotizacion para comedor industrial en Tijuana">
            Solicitar cotizacion
          </a>

          <div className="stats reveal in" aria-label="Indicadores de servicio">
            <div>
              <span className="num">500+</span>
              <span className="label">Comidas diarias</span>
            </div>
            <div>
              <span className="num">10</span>
              <span className="label">Años de experiencia</span>
            </div>
            <div>
              <span className="num">95%</span>
              <span className="label">Satisfaccion</span>
            </div>
          </div>
        </div>
        <video className="hero-bg" autoPlay muted loop playsInline aria-hidden="true">
          <source src={siteContent.heroVideo} type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
      </section>

      <section id="nosotros" className="section">
        <div className="container">
          <header className="section-head reveal in">
            <h2>Quienes somos</h2>
            <p>{siteContent.about.body}</p>
          </header>

          <section className="about-section">
            <div className="about-container">
              <div className="about-item">
                <h3 className="about-title">Mision</h3>
                <p>{siteContent.about.mission}</p>
              </div>
              <div className="about-item">
                <h3 className="about-title">Vision</h3>
                <p>{siteContent.about.vision}</p>
              </div>
            </div>
          </section>

          <section className="valores">
            <h2>Nuestros valores</h2>
            <div className="valores-grid">
              <div className="valor-card"><div className="icon"><i className="fa-solid fa-shield-halved" aria-hidden="true" /></div><p>Calidad sin concesiones</p></div>
              <div className="valor-card"><div className="icon"><i className="fa-solid fa-heart" aria-hidden="true" /></div><p>Pasion por el sabor casero</p></div>
              <div className="valor-card"><div className="icon"><i className="fa-solid fa-people-group" aria-hidden="true" /></div><p>Servicio centrado en la gente</p></div>
              <div className="valor-card"><div className="icon"><i className="fa-solid fa-shield" aria-hidden="true" /></div><p>Seguridad e higiene alimentaria</p></div>
              <div className="valor-card"><div className="icon"><i className="fa-solid fa-eye" aria-hidden="true" /></div><p>Transparencia y honestidad</p></div>
              <div className="valor-card"><div className="icon"><i className="fa-solid fa-lightbulb" aria-hidden="true" /></div><p>Innovacion continua</p></div>
              <div className="valor-card"><div className="icon"><i className="fa-solid fa-leaf" aria-hidden="true" /></div><p>Responsabilidad social y ambiental</p></div>
              <div className="valor-card"><div className="icon"><i className="fa-solid fa-user-check" aria-hidden="true" /></div><p>Trabajo en equipo</p></div>
            </div>
          </section>
        </div>
      </section>

      <section id="servicios" className="section alt">
        <div className="container">
          <header className="section-head reveal in">
            <h2>Servicios</h2>
            <p>{siteContent.servicesIntro}</p>
          </header>

          <div className="grid-3">
            {siteContent.services.map((service) => (
              <article key={service.title} className="service reveal in">
                <img src={service.image} alt={service.alt} loading="lazy" decoding="async" />
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Preguntas frecuentes</h2>
          {siteContent.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <FoodTheChildFooter />
    </main>
  );
}
