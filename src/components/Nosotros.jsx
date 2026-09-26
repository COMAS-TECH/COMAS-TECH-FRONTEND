export default function Nosotros() {
  return (
    <section id="nosotros" className="section">
      <div className="container nosotros">
        <div className="nosotros__img" aria-hidden="true" />
        <div className="nosotros__text">
          <h2 className="section__title" style={{ textAlign: 'left' }}>Nosotros</h2>
          <p>
            Comas TECH es una iniciativa nacida en el distrito de Comas para acortar la brecha
            digital entre los jovenes. Creemos que la tecnologia debe ser una herramienta de
            oportunidad real, sin importar el punto de partida.
          </p>
          <p>
            Trabajamos con instructores locales, contenido actualizado en tecnologias emergentes
            y un modelo de pago flexible, para que el costo nunca sea la barrera que impida
            aprender.
          </p>
          <ul className="nosotros__lista">
            <li>+500 jovenes capacitados</li>
            <li>4 lineas de formacion tecnologica</li>
            <li>Certificacion en cada curso</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
