import { useEffect, useRef } from 'react';
import { useFadeUp } from '../hooks/useFadeUp';

function Particles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100 + 50}%`;
      p.style.animationDuration = `${8 + Math.random() * 12}s`;
      p.style.animationDelay = `${Math.random() * 10}s`;
      const size = `${2 + Math.random() * 3}px`;
      p.style.width = size;
      p.style.height = size;
      container.appendChild(p);
      particles.push(p);
    }

    return () => particles.forEach((p) => p.remove());
  }, []);

  return <div className="hero__particles" ref={containerRef} />;
}

export default function Hero() {
  const sectionRef = useFadeUp();

  const handleClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero__bg">
        <div className="hero__gradient" />
        <Particles />
      </div>
      <div className="hero__content">
        <h1 className="hero__logo fade-up">
          <img
            src="/logo-vertical-blanco.svg"
            alt="Viento Sur Consultores. Estrategia e implementación en salud"
            className="hero__logo-img"
          />
        </h1>
        <p className="hero__description fade-up">
          Consultores senior en programas y proyectos de salud para Argentina y América Latina.
        </p>
        <div className="hero__actions fade-up">
          <a href="#servicios" className="btn btn--primary" onClick={handleClick}>
            Capacidades
          </a>
          <a href="#clientes" className="btn btn--primary" onClick={handleClick}>
            Sectores e instituciones destinatarias
          </a>
          <a href="#equipo" className="btn btn--primary" onClick={handleClick}>
            Equipo
          </a>
          <a href="#contacto" className="btn btn--primary" onClick={handleClick}>
            Contacto
          </a>
        </div>
      </div>
    </section>
  );
}
