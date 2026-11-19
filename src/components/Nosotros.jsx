import { useFadeUp } from '../hooks/useFadeUp';
import { Icon } from './Icons';

// Áreas temáticas y enfoque: texto del folleto vigente (v14, 10/11/26)
const areas = ['VIH e ITS', 'Hepatitis virales', 'Tuberculosis'];

// Mensajes clave de la Estrategia de comunicación
const razones = [
  {
    icon: 'briefcase',
    titulo: 'Experiencia desde adentro',
    texto:
      'Los socios dirigieron programas nacionales y trabajaron en organismos internacionales y con la sociedad civil. Conocen cómo se decide y cómo se ejecuta.',
  },
  {
    icon: 'chart',
    titulo: 'De los datos a la decisión',
    texto:
      'Indicadores con definiciones claras y análisis pensados para gestionar, no informes que quedan en un cajón.',
  },
  {
    icon: 'pin',
    titulo: 'Implementación',
    texto:
      'Acompañamos la ejecución en terreno, además del diseño, y transferimos las herramientas a los equipos que las van a usar.',
  },
  {
    icon: 'shield',
    titulo: 'Transparencia',
    texto: 'Política explícita de conflicto de interés en el trabajo con la industria.',
  },
];

function Olas() {
  // Olas del encabezado del folleto (Banners/Olas_Encabezado_VientoSur_v01)
  return (
    <svg
      className="nosotros__olas"
      viewBox="0 0 800 180"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="#225A72" d="M0 0H800V14C640 4 520 56 380 84C250 110 120 104 0 70Z" />
      <path fill="#3585A7" d="M0 70C120 104 250 110 380 84C520 56 640 4 800 14V32C650 28 540 80 400 110C260 140 120 132 0 98Z" />
      <path fill="#87C9D8" d="M0 98C120 132 260 140 400 110C540 80 650 28 800 32V44C660 46 560 98 420 128C280 160 130 156 0 120Z" />
      <path fill="#87C3CC" fillOpacity="0.55" d="M0 120C130 156 280 160 420 128C560 98 660 46 800 44V50C670 56 580 110 440 140C300 172 140 170 0 136Z" />
    </svg>
  );
}

export default function Nosotros() {
  const sectionRef = useFadeUp();

  return (
    <section className="nosotros" id="nosotros" ref={sectionRef}>
      <Olas />
      <div className="container">
        <div className="areas fade-up">
          <p className="areas__label">Foco temático</p>
          <ul className="areas__lista">
            {areas.map((a) => (
              <li key={a} className="areas__item">
                {a}
              </li>
            ))}
          </ul>
          <p className="areas__enfoque">
            Con un enfoque transversal de <strong>equidad, género y derechos</strong>.
          </p>
        </div>

        <header className="section-header fade-up">
          <h2 className="section-title">Por qué Viento Sur</h2>
        </header>
        <div className="razones">
          {razones.map((r) => (
            <article className="razon fade-up" key={r.titulo}>
              <span className="razon__icon">
                <Icon name={r.icon} />
              </span>
              <h3 className="razon__titulo">{r.titulo}</h3>
              <p className="razon__texto">{r.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
