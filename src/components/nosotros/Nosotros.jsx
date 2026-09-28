import './Nosotros.css';

const PUNTOS = [
  'Formación accesible para jóvenes de Comas',
  'Docentes con experiencia en la industria',
  'Proyectos reales y portafolio al egresar',
  'Acompañamiento hasta la inserción laboral',
];

export default function Nosotros() {
  return (
    <section id="nosotros" className="section">
      <div className="container nosotros">
        <div className="nosotros__visual" aria-hidden="true">
          <div className="nosotros__block nosotros__block--primary" />
          <div className="nosotros__block nosotros__block--accent" />
        </div>

        <div className="nosotros__text">
          <h2 className="section__title" style={{ textAlign: 'left' }}>
            Sobre Comas TECH
          </h2>
          <p>
            Somos una iniciativa local enfocada en cerrar la brecha digital en
            el distrito de Comas. Formamos a jóvenes en competencias tecnológicas
            demandadas por el mercado laboral actual.
          </p>
          <ul className="nosotros__list">
            {PUNTOS.map((punto) => (
              <li key={punto}>{punto}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}