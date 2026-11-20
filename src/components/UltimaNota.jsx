import { novedades } from '../data/novedades';

const FECHA = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });

// Recuadro de la portada con la última novedad que tiene página o enlace.
export default function UltimaNota() {
  const n = novedades.find((x) => x.enlace);
  if (!n) return null;
  const interno = n.enlace.startsWith('/');
  return (
    <a
      className="ultima-nota fade-up"
      href={n.enlace}
      {...(interno ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <span className="ultima-nota__meta">
        Última nota técnica · <time dateTime={n.fecha}>{FECHA.format(new Date(`${n.fecha}T12:00:00`))}</time>
      </span>
      <span className="ultima-nota__titulo">{n.titulo}</span>
      <span className="ultima-nota__texto">{n.destacado || n.resumen}</span>
      <span className="ultima-nota__leer">Leer la nota →</span>
    </a>
  );
}
