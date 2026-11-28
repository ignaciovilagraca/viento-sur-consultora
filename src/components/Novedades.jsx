import { useState, useCallback } from 'react';
import { track } from '@vercel/analytics';
import { useFadeUp } from '../hooks/useFadeUp';
import { enviar } from '../lib/enviar';
import { novedades } from '../data/novedades';

// Miniatura de la nota: la indicada en imagen o, para las notas propias, la imagen de la página.
const imagenDe = (n) => n.imagen || (n.enlace && n.enlace.startsWith('/novedades/') ? `${n.enlace}.png` : null);

const FECHA = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });

function formatearFecha(iso) {
  // Mediodía para que la zona horaria no corra la fecha al día anterior
  return FECHA.format(new Date(`${iso}T12:00:00`));
}

function Suscripcion() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus('sending');
      try {
        await enviar('Nueva suscripción al newsletter', { Correo: email }, email);
      } catch {
        setStatus('error');
        return;
      }
      track('Suscripción al newsletter');
      window.umami?.track('newsletter');
      setStatus('sent');
      setEmail('');
    },
    [email],
  );

  return (
    <form className="newsletter fade-up" onSubmit={handleSubmit}>
      <h3 className="newsletter__title">Newsletter</h3>
      <p className="newsletter__text">
        Si quieren recibir las novedades por correo, déjennos su dirección.
      </p>
      {status === 'sent' ? (
        <p className="newsletter__ok" role="status">
          Listo. Les vamos a escribir cuando publiquemos novedades.
        </p>
      ) : (
        <div className="newsletter__row">
          <label htmlFor="newsletter-email" className="visually-hidden">
            Correo electrónico
          </label>
          <input
            type="email"
            id="newsletter-email"
            required
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando...' : 'Suscribirse'}
          </button>
        </div>
      )}
      {status === 'error' && (
        <p className="form-error" role="alert">
          No se pudo completar la suscripción. Intenten de nuevo o escriban a
          info@vientosurconsultores.com.
        </p>
      )}
      <p className="form-privacy">
        Usamos su correo solo para enviar el newsletter. Pueden darse de baja cuando quieran
        escribiendo a info@vientosurconsultores.com.
      </p>
    </form>
  );
}

export default function Novedades() {
  const sectionRef = useFadeUp();

  return (
    <section className="novedades" id="novedades" ref={sectionRef}>
      <div className="container">
        <header className="section-header fade-up">
          <h2 className="section-title">Novedades</h2>
          <p className="section-subtitle">Publicaciones, presentaciones y noticias del equipo.</p>
        </header>
        <div className="novedades__inner">
          <div className="novedades__lista fade-up">
            {novedades.length === 0 ? (
              <p className="novedades__vacio">Pronto vamos a publicar las primeras novedades.</p>
            ) : (
              novedades.map((n) => (
                <article className={`novedad${imagenDe(n) ? ' novedad--con-imagen' : ''}`} key={`${n.fecha}-${n.titulo}`}>
                  {imagenDe(n) && (
                    <a className="novedad__imagen" href={n.enlace} tabIndex={-1} aria-hidden="true">
                      <img src={imagenDe(n)} alt="" width="1200" height="630" loading="lazy" />
                    </a>
                  )}
                  <div className="novedad__cuerpo">
                  <time className="novedad__fecha" dateTime={n.fecha}>
                    {formatearFecha(n.fecha)}
                  </time>
                  <h3 className="novedad__titulo">
                    {n.enlace ? (
                      n.enlace.startsWith('/') ? (
                        <a href={n.enlace}>{n.titulo}</a>
                      ) : (
                        <a href={n.enlace} target="_blank" rel="noopener noreferrer">
                          {n.titulo}
                        </a>
                      )
                    ) : (
                      n.titulo
                    )}
                  </h3>
                  <p className="novedad__resumen">{n.resumen}</p>
                  </div>
                </article>
              ))
            )}
          </div>
          <Suscripcion />
        </div>
      </div>
    </section>
  );
}
