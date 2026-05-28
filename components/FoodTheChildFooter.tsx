import { siteContent } from "@/lib/siteContent";

export function FoodTheChildFooter() {
  return (
    <footer className="ftc-footer">
      <div className="container footer-inner">
        <div className="brand-mini">
          <img src="/assets/logo.png" alt="Food The Child" loading="lazy" decoding="async" />
          <p>Sabor casero a gran escala para impulsar la energia de tu equipo.</p>
        </div>
        <div className="contact-mini">
          <a href={siteContent.phoneHref}>{siteContent.phone}</a> · <a href={siteContent.emailHref}>{siteContent.email}</a>
        </div>
        <small>© 2026 Food The Child · Todos los derechos reservados</small>
      </div>
    </footer>
  );
}
