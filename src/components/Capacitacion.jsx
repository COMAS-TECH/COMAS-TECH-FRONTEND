const ITEMS = [
  {
    icon: '🧑‍💻',
    title: 'Clases practicas',
    text: 'Metodologia aplicada con proyectos reales desde la primera semana.',
  },
  {
    icon: '🤖',
    title: 'Tecnologias emergentes',
    text: 'Inteligencia artificial, automatizacion y herramientas digitales actuales.',
  },
  {
    icon: '🎓',
    title: 'Certificacion',
    text: 'Al finalizar cada curso recibes un certificado de Comas TECH.',
  },
  {
    icon: '💳',
    title: 'Planes de pago',
    text: 'Paga al contado o en cuotas, con Yape o tarjeta.',
  },
];

export default function Capacitacion() {
  return (
    <section id="capacitacion" className="section section--alt">
      <div className="container">
        <h2 className="section__title">Capacitacion</h2>
        <p className="section__subtitle">
          Formamos a jovenes de Comas con una metodologia practica orientada a empleabilidad.
        </p>
        <div className="grid grid--4">
          {ITEMS.map((item) => (
            <div className="info-card" key={item.title}>
              <span className="info-card__icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
