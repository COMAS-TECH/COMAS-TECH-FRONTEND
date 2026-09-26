export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <span className="badge">Comas, Lima</span>
          <h1>
            Fortalecimiento de competencias digitales mediante
            <span className="text-accent"> tecnologias emergentes</span>
          </h1>
          <p>
            Capacitamos a jovenes de Comas en programacion, inteligencia artificial,
            ciberseguridad y herramientas digitales, con certificacion incluida y planes
            de pago accesibles.
          </p>
          <div className="hero__cta">
            <a href="#cursos" className="btn">Ver cursos</a>
            <a href="#nosotros" className="btn btn--ghost">Conocenos</a>
          </div>
        </div>
        <div className="hero__art" aria-hidden="true">
          <div className="hero__blob" />
        </div>
      </div>
    </section>
  );
}
