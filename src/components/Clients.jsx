import { useFadeUp } from '../hooks/useFadeUp';
import { clients } from '../data/clients';
import { Icon } from './Icons';

export default function Clients() {
  const sectionRef = useFadeUp();

  return (
    <section className="clients" id="clientes" ref={sectionRef}>
      <div className="container">
        <header className="section-header fade-up">
          <h2 className="section-title">Servicios dirigidos a:</h2>
        </header>
        <div className="clients__grid fade-up">
          {clients.map((c) => (
            <div className="client-tag" key={c.label}>
              <Icon name={c.icon} />
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
