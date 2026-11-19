import { useState, useCallback } from 'react';
import { track } from '@vercel/analytics';
import { useFadeUp } from '../hooks/useFadeUp';
import { enviar } from '../lib/enviar';
import {
  MailIcon,
  PhoneIcon,
  WhatsappIcon,
  InstagramIcon,
  LinkedinIconMinimal,
  FacebookIcon,
  WebIcon,
} from './Icons';

const INITIAL_STATE = { name: '', email: '', org: '', message: '' };

export default function Contact() {
  const sectionRef = useFadeUp();
  const [form, setForm] = useState(INITIAL_STATE);
  const [status, setStatus] = useState('idle');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus('sending');

      try {
        await enviar(
          `Consulta web: ${form.name}`,
          {
            Nombre: form.name,
            Correo: form.email,
            Organización: form.org || '(no indicó)',
            Mensaje: form.message,
          },
          form.email,
        );
      } catch {
        setStatus('error');
        return;
      }

      track('Consulta enviada');
      setStatus('sent');
      setForm(INITIAL_STATE);
      setTimeout(() => setStatus('idle'), 3000);
    },
    [form],
  );

  const buttonText =
    status === 'sending' ? 'Enviando...' : status === 'sent' ? 'Mensaje enviado' : 'Enviar mensaje';

  return (
    <section className="contact" id="contacto" ref={sectionRef}>
      <div className="container">
        <div className="contact__inner">
          <div className="contact__info fade-up">
            <div className="contact__logo">
              <img
                src="/logo-vertical-color.svg"
                alt="Viento Sur Consultores. Estrategia e implementación en salud"
                className="contact__logo-img"
              />
            </div>
            <div className="contact__channels">
              <a href="mailto:info@vientosurconsultores.com" className="contact__channel">
                <MailIcon />
                <div>
                  <span className="contact__channel-label">Email</span>
                  <span className="contact__channel-value">info@vientosurconsultores.com</span>
                </div>
              </a>
              <a href="tel:+5491141646690" className="contact__channel">
                <PhoneIcon />
                <div>
                  <span className="contact__channel-label">Teléfono</span>
                  <span className="contact__channel-value">+54 911 41646690</span>
                </div>
              </a>
              <a
                href="https://wa.me/5491141646690"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__channel"
              >
                <WhatsappIcon />
                <div>
                  <span className="contact__channel-label">WhatsApp</span>
                  <span className="contact__channel-value">+54 911 41646690</span>
                </div>
              </a>
              <a href="tel:+17862390333" className="contact__channel">
                <PhoneIcon />
                <div>
                  <span className="contact__channel-label">Teléfono</span>
                  <span className="contact__channel-value">+1 786 2390333</span>
                </div>
              </a>
              <a
                href="https://www.instagram.com/vientosurconsultores/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__channel"
              >
                <InstagramIcon />
                <div>
                  <span className="contact__channel-label">Instagram</span>
                  <span className="contact__channel-value">@vientosurconsultores</span>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/company/vientosurconsultores"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__channel"
              >
                <LinkedinIconMinimal />
                <div>
                  <span className="contact__channel-label">LinkedIn</span>
                  <span className="contact__channel-value">vientosurconsultores</span>
                </div>
              </a>
              <a
                href="https://www.facebook.com/vientosurconsultores"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__channel"
              >
                <FacebookIcon />
                <div>
                  <span className="contact__channel-label">Facebook</span>
                  <span className="contact__channel-value">Viento Sur Consultores</span>
                </div>
              </a>
              <a href="https://www.vientosurconsultores.com" className="contact__channel">
                <WebIcon />
                <div>
                  <span className="contact__channel-label">Web</span>
                  <span className="contact__channel-value">www.vientosurconsultores.com</span>
                </div>
              </a>
            </div>
          </div>

          <form className="contact__form fade-up" onSubmit={handleSubmit}>
            <h3 className="contact__form-title">Envíennos su consulta</h3>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Nombre y apellido"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="correo@ejemplo.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="org">Organización</label>
              <input
                type="text"
                id="org"
                name="org"
                placeholder="Nombre de su organización"
                value={form.org}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                placeholder="Describan brevemente su consulta..."
                value={form.message}
                onChange={handleChange}
              />
            </div>
            <p className="form-privacy">
              Sus datos se usan solo para responder la consulta. Pueden pedir acceder a ellos,
              corregirlos o eliminarlos escribiendo a info@vientosurconsultores.com (Ley 25.326 de
              Protección de los Datos Personales).
            </p>
            <button
              type="submit"
              className="btn btn--primary btn--full"
              disabled={status === 'sending' || status === 'sent'}
              style={status === 'sent' ? { background: 'var(--color-dark)' } : undefined}
            >
              {buttonText}
            </button>
            {status === 'error' && (
              <p className="form-error" role="alert">
                No se pudo enviar el mensaje. Revisen su conexión e intenten de nuevo, o escriban a
                info@vientosurconsultores.com.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
