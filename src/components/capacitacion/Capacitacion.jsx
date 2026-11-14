import './Capacitacion.css';

const ITEMS = [
  {
    title: 'Clases practicas',
    text: 'Metodologia aplicada con proyectos reales desde la primera semana.',
  },
  {
    title: 'Tecnologias emergentes',
    text: 'Inteligencia artificial, automatizacion y herramientas digitales actuales.',
  },
  {
    title: 'Certificacion',
    text: 'Al finalizar cada curso recibes un certificado de Comas TECH.',
  },
  {
    title: 'Planes de pago',
    text: 'Paga al contado o en cuotas, con Yape o tarjeta.',
  },
];

export default function Capacitacion() {
  return (
    <section id="capacitacion" className="section section--alt">
      <div className="container">
        <header className="capacitacion__header">
          <span className="capacitacion__eyebrow">Capacitacion</span>
          <h2 className="section__title capacitacion__title">
            Aprende con una metodologia practica
          </h2>
          <p className="section__subtitle capacitacion__subtitle">
            Formamos a personas de todas las edades con una metodologia
            orientada a la empleabilidad y al crecimiento profesional.
          </p>
        </header>

        <div className="capacitacion__grid">
          {ITEMS.map((item, index) => (
            <article className="capacitacion__card" key={item.title}>
              <span className="capacitacion__number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="capacitacion__card-title">{item.title}</h3>
              <p className="capacitacion__card-text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}