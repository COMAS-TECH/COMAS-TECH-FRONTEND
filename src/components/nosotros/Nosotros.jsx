import './Nosotros.css';

const STATS = [
  { value: '4', label: 'Alumnos en formacion' },
  { value: '+20', label: 'Cursos activos' },
  { value: '95%', label: 'Satisfaccion' },
];

export default function Nosotros() {
  return (
    <section id="nosotros" className="section">
      <div className="container">
        <div className="nosotros__inner">
          <div className="nosotros__content">
            <span className="nosotros__eyebrow">Nosotros</span>
            <h2 className="section__title nosotros__title">
              Talento local, oportunidades reales
            </h2>

            <p>
              En <strong>Comas TECH</strong> creemos que el talento esta en
              todas partes, pero las oportunidades no. Por eso acercamos
              formacion tecnologica de calidad a personas de todas las edades
              en Comas, con docentes en actividad y proyectos reales.
            </p>

            <p>
              Somos estudiantes construyendo este proyecto para que mas gente
              tenga acceso a una educacion digital practica, accesible y
              conectada con el mundo laboral.
            </p>

            <p>
              Nuestra mision es que cada estudiante salga con un portafolio, un
              certificado y la confianza para postular a su primer empleo
              digital.
            </p>
          </div>

          <ul className="nosotros__stats">
            {STATS.map((stat) => (
              <li key={stat.label}>
                <span>{stat.value}</span>
                <p>{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}