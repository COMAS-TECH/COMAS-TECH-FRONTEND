import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge">Comas TECH</span>
          <h1 className="hero__title">
            Aprende las <span>competencias digitales</span> que el futuro pide
          </h1>
 <p className="hero__text">
  Cursos prácticos de programación, ciberseguridad, diseño y
  automatización con IA para personas de todas las edades en Comas, Lima.
</p>
          <div className="hero__actions">
            <Link to="/cursos" className="btn">
              Ver cursos
            </Link>
            <Link to="/contacto" className="btn btn--ghost">
              Contáctanos
            </Link>
          </div>
        </div>

        <div className="hero__image">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
            alt="Jóvenes aprendiendo tecnología"
          />
        </div>
      </div>
    </section>
  );
}