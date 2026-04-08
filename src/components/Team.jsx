import { useFadeUp } from '../hooks/useFadeUp';
import { team } from '../data/team';

function TeamCard({ initials, name, role, bio }) {
  return (
    <article className="team-card fade-up">
      <div className="team-card__avatar">
        <span>{initials}</span>
      </div>
      <h3 className="team-card__name">{name}</h3>
      <p className="team-card__role">{role}</p>
      <p className="team-card__bio">{bio}</p>
    </article>
  );
}

export default function Team() {
  const sectionRef = useFadeUp();

  return (
    <section className="team" id="equipo" ref={sectionRef}>
      <div className="container">
        <header className="section-header fade-up">
          <h2 className="section-title">Equipo Consultor</h2>
          <p className="section-subtitle">
            Equipo senior de consultores con amplia experiencia de trabajo con gobiernos, organismos
            internacionales, comunidades e industria, que combina rigor técnico, comprensión del contexto
            regional y capacidad de ejecución
          </p>
        </header>
        <div className="team__grid">
          {team.map((m) => (
            <TeamCard key={m.initials} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
