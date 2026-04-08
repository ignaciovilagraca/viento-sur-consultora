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
            <img src="/logo-wind.png" alt="" className="footer__logo-icon" />
            <div>
              <p className="footer__name">Viento Sur Consultora</p>
              <p className="footer__tagline">Estrategia e implementación en salud</p>
            </div>
          </div>
          <nav className="footer__links">
            <a href="#servicios" onClick={handleClick}>Servicios</a>
            <a href="#clientes" onClick={handleClick}>Clientes</a>
            <a href="#equipo" onClick={handleClick}>Equipo</a>
            <a href="#contacto" onClick={handleClick}>Contacto</a>
          </nav>
          <p className="footer__copy">&copy; 2026 Viento Sur Consultora. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
