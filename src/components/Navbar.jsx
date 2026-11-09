import { useState, useCallback } from 'react';
import { useScrolled } from '../hooks/useScrolled';

export default function Navbar() {
  const scrolled = useScrolled(60);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }, []);

  const handleLinkClick = useCallback(
    (e) => {
      const href = e.currentTarget.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      closeMenu();
    },
    [closeMenu],
  );

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#hero" className="nav__logo" onClick={handleLinkClick}>
          <img src="/logo-horizontal-blanco.svg" alt="Viento Sur Consultores" className="nav__logo-img" />
        </a>
        <button
          className={`nav__toggle${menuOpen ? ' active' : ''}`}
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span /><span /><span />
        </button>
        <ul className={`nav__links${menuOpen ? ' active' : ''}`}>
          <li><a href="#servicios" onClick={handleLinkClick}>Servicios</a></li>
          <li><a href="#clientes" onClick={handleLinkClick}>Clientes</a></li>
          <li><a href="#equipo" onClick={handleLinkClick}>Equipo</a></li>
          <li><a href="#novedades" onClick={handleLinkClick}>Novedades</a></li>
          <li><a href="#contacto" className="nav__cta" onClick={handleLinkClick}>Contacto</a></li>
        </ul>
      </div>
    </nav>
  );
}
