export default function Footer() {
  const handleClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <img
              src="/logo-horizontal-blanco.svg"
              alt="Viento Sur Consultores. Estrategia e implementación en salud"
              className="footer__logo-img"
            />
          </div>
          <nav className="footer__links">
            <a href="#servicios" onClick={handleClick}>Capacidades</a>
            <a href="#equipo" onClick={handleClick}>Equipo</a>
            <a href="#clientes" onClick={handleClick}>Sectores e instituciones destinatarias</a>
            <a href="#novedades" onClick={handleClick}>Novedades</a>
            <a href="#contacto" onClick={handleClick}>Contacto</a>
          </nav>
          <p className="footer__copy">&copy; 2026 Viento Sur Consultores. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
