import Cursos from '../../components/cursos/Cursos.jsx';
import './CursosPage.css';

export default function CursosPage({ onInscribirme }) {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section__title">Nuestros Cursos</h1>
        <p className="section__subtitle">
          Programación, ciberseguridad, diseño y automatización con IA.
        </p>

        <Cursos onInscribirme={onInscribirme} />
      </div>
    </section>
  );
}