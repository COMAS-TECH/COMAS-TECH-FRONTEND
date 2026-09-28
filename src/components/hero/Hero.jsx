import './Hero.css';

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge">Programa de formación digital</span>
          <h1 className="hero__title">
            Competencias digitales para jóvenes de Comas
          </h1>
          <p className="hero__text">
            Cursos prácticos en programación, ciberseguridad, diseño y
            automatización con inteligencia artificial. Aprende con proyectos
            reales y obtén tu certificación.
          </p>
          <div className="hero__actions">
            <a href="#cursos" className="btn">
              Ver cursos
            </a>
            <a href="#contacto" className="btn btn--ghost">
              Solicitar información
            </a>
          </div>

          <ul className="hero__stats">
            <li>
              <strong>4</strong>
              <span>Cursos activos</span>
            </li>
            <li>
              <strong>100%</strong>
              <span>Práctico</span>
            </li>
            <li>
              <strong>Certificado</strong>
              <span>Al finalizar</span>
            </li>
          </ul>
        </div>

        <div className="hero__art" aria-hidden="true">
          <div className="hero__shape hero__shape--primary" />
          <div className="hero__shape hero__shape--accent" />
        </div>
      </div>
    </section>
  );
}