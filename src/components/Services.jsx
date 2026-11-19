import { useFadeUp } from '../hooks/useFadeUp';
import { services } from '../data/services';
import { Icon } from './Icons';

function ServiceCard({ number, icon, title, description, deliverables }) {
  return (
    <article className="service-card fade-up" data-index={number}>
      <div className="service-card__head">
        <span className="service-card__icon">
          <Icon name={icon} />
        </span>
        <div>
          <div className="service-card__number">{number}</div>
          <h3 className="service-card__title">{title}</h3>
        </div>
      </div>
      <p className="service-card__description">{description}</p>
      <p className="service-card__label">Entregables</p>
      <ul className="service-card__deliverables">
        {deliverables.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Services() {
  const sectionRef = useFadeUp();

  return (
    <section className="services" id="servicios" ref={sectionRef}>
      <div className="container">
        <header className="section-header fade-up">
          <h2 className="section-title">Capacidades y propuestas de intervención</h2>
        </header>
        <div className="services__grid">
          {services.map((s) => (
            <ServiceCard key={s.number} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
