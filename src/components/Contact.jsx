import { useState, useCallback } from 'react';
import { useFadeUp } from '../hooks/useFadeUp';
import { MailIcon, PhoneIcon, InstagramIcon } from './Icons';

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
    (e) => {
      e.preventDefault();
      setStatus('sending');

      setTimeout(() => {
        setStatus('sent');
        setForm(INITIAL_STATE);
        setTimeout(() => setStatus('idle'), 3000);
      }, 1200);
    },
    [],
  );

  const buttonText =
    status === 'sending' ? 'Enviando...' : status === 'sent' ? 'Mensaje enviado' : 'Enviar mensaje';

  return (
    <section className="contact" id="contacto" ref={sectionRef}>
      <div className="container">
        <div className="contact__inner">
          <div className="contact__info fade-up">
            <div className="contact__logo">
              <img src="/logo-wind.png" alt="" className="contact__logo-wind" />
              <p className="contact__logo-title">Viento Sur</p>
              <div className="contact__logo-divider" />
              <p className="contact__logo-sub">Consultora</p>
              <p className="contact__logo-tagline">Estrategia e implementación en salud</p>
            </div>
            <div className="contact__channels">
              <a href="mailto:info@vientosurconsultora.com" className="contact__channel">
                <MailIcon />
                <div>
                  <span className="contact__channel-label">Email</span>
                  <span className="contact__channel-value">info@vientosurconsultora.com</span>
                </div>
              </a>
              <a href="tel:+5491141646690" className="contact__channel">
                <PhoneIcon />
                <div>
                  <span className="contact__channel-label">Teléfono</span>
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
                href="https://instagram.com/vientosur.consultora"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__channel"
              >
                <InstagramIcon />
                <div>
                  <span className="contact__channel-label">Instagram</span>
                  <span className="contact__channel-value">@vientosur.consultora</span>
                </div>
              </a>
            </div>
          </div>

          <form className="contact__form fade-up" onSubmit={handleSubmit}>
            <h3 className="contact__form-title">Escríbanos</h3>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Su nombre"
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
                placeholder="Cuéntenos brevemente sobre su consulta..."
                value={form.message}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn--primary btn--full"
              disabled={status !== 'idle'}
              style={status === 'sent' ? { background: 'var(--color-accent)' } : undefined}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
