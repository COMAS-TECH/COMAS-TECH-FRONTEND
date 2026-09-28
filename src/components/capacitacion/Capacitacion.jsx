import './Capacitacion.css';

const ITEMS = [
  {
    title: 'Clases prácticas',
    text: 'Metodología aplicada con proyectos reales desde la primera semana.',
  },
  {
    title: 'Tecnologías emergentes',
    text: 'Inteligencia artificial, automatización y herramientas digitales actuales.',
  },
  {
    title: 'Certificación',
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
        <h2 className="section__title">Capacitación</h2>
        <p className="section__subtitle">
          Formamos a jóvenes de Comas con una metodología práctica orientada a
          empleabilidad.
        </p>

        <div className="capacitacion__grid">
          {ITEMS.map((item, index) => (
            <article className="capacitacion__card" key={item.title}>
              <span className="capacitacion__number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}