import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import Services from './components/Services';
import Clients from './components/Clients';
import Team from './components/Team';
import Novedades from './components/Novedades';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Umami: hasta qué secciones llega cada visita (una vez por sección, cuando cruza el medio de la pantalla)
const SECCIONES = ['nosotros', 'servicios', 'equipo', 'clientes', 'novedades', 'contacto'];

function useSecciones() {
  useEffect(() => {
    const vistas = new Set();
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const nombre = e.target.id;
          if (!e.isIntersecting || vistas.has(nombre)) continue;
          vistas.add(nombre);
          window.umami?.track('seccion', { nombre });
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    for (const id of SECCIONES) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);
}

export default function App() {
  useSecciones();
  return (
    <>
      <Navbar />
      <Hero />
      <Nosotros />
      <Services />
      <Team />
      <Clients />
      <Novedades />
      <Contact />
      <Footer />
    </>
  );
}
