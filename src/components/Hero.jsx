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
        <p className="hero__eyebrow fade-up">Argentina · América Latina</p>
        <h1 className="hero__title fade-up">Estrategia e implementación en salud</h1>
        <p className="hero__description fade-up">
          Equipo de consultores senior orientado a fortalecer el desempeño de programas y proyectos
          de salud, con énfasis en enfermedades transmisibles (VIH/ITS, hepatitis virales y
          tuberculosis) y un enfoque transversal de equidad, género y derechos.
        </p>
        <div className="hero__actions fade-up">
          <a href="#contacto" className="btn btn--primary" onClick={handleClick}>
            Conversemos
          </a>
          <a href="#servicios" className="btn btn--outline" onClick={handleClick}>
            Ver capacidades
          </a>
          <a href="#equipo" className="btn btn--outline" onClick={handleClick}>
            Ver equipo
          </a>
        </div>
      </div>
    </section>
  );
}
