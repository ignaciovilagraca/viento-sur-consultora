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
        <div className="hero__logo fade-up">
          <img src="/logo-wind.png" alt="" className="hero__logo-img" />
          <h1 className="hero__logo-title">Viento Sur</h1>
          <div className="hero__logo-divider" />
          <p className="hero__logo-sub">Consultora</p>
          <p className="hero__logo-tagline">Asesoramiento, planificación, implementación y monitoreo en salud</p>
          <p className="hero__logo-location">Argentina · América Latina</p>
        </div>
        <p className="hero__description fade-up">
          Consultora senior orientada a fortalecer el desempeño de programas y proyectos de salud, con
          énfasis en enfermedades transmisibles (VIH/ITS, hepatitis virales, tuberculosis) y un enfoque
          transversal de equidad, género y derechos.
        </p>
        <p className="hero__claim fade-up">Convertimos políticas de salud en impacto medible</p>
        <div className="hero__actions fade-up">
          <a href="#servicios" className="btn btn--primary" onClick={handleClick}>
            Capacidades y propuestas
          </a>
          <a href="#contacto" className="btn btn--outline" onClick={handleClick}>
            Contacto
          </a>
        </div>
      </div>
      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
