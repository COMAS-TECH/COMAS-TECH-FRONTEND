import './Nosotros.css';

export default function Nosotros() {
  return (
    <section id="nosotros" className="section">
      <div className="container nosotros__inner">
        <div className="nosotros__content">
          <h2 className="section__title nosotros__title">Nosotros</h2>
         <p>
  En <strong>Comas TECH</strong> creemos que el talento está en todas
  partes, pero las oportunidades no. Por eso acercamos formación
  tecnológica de calidad a personas de todas las edades en Comas, con
  docentes en actividad y proyectos reales.
</p>
          <p>
            Nuestra misión es que cada estudiante salga con un portafolio, un
            certificado y la confianza para postular a su primer empleo
            digital.
          </p>
        </div>

        <ul className="nosotros__stats">
          <li>
            <span>+500</span>
            <p>Alumnos formados</p>
          </li>
          <li>
            <span>+20</span>
            <p>Cursos activos</p>
          </li>
          <li>
            <span>95%</span>
            <p>Satisfacción</p>
          </li>
        </ul>
      </div>
    </section>
  );
}