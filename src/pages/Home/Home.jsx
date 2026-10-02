import Hero from '../../components/hero/Hero.jsx';
import Cursos from '../../components/cursos/Cursos.jsx';
import HomeVideo from '../../components/HomeVideo/HomeVideo.jsx';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home({ onInscribirme }) {
  return (
    <>
      <Hero />

      {/* Video */}
      <HomeVideo />

      {/* Cursos destacados */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">Cursos destacados</h2>
          <p className="section__subtitle">
            Elige el curso que impulse tu carrera digital.
          </p>
          <Cursos onInscribirme={onInscribirme} />

          <div className="home__more">
            <Link to="/cursos" className="btn btn--ghost">
              Ver todos los cursos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}