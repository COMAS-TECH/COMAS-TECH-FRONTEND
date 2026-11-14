import './Contacto.css';

export default function Contacto() {
  return (
    <section className="section">
      <div className="container">
        <div className="contacto__inner">
          <div className="contacto__info">
            <h1 className="section__title contacto__title">Contactanos</h1>
            <p>
              Escribenos y te responderemos a la brevedad. Tambien puedes
              visitarnos en nuestras instalaciones.
            </p>

            <ul className="contacto__list">
              <li>
                <strong>Telefono</strong>
                <a href="tel:+51999999999">+51 999 999 999</a>
              </li>
              <li>
                <strong>Correo</strong>
                <a href="mailto:contacto@comastech.com">
                  contacto@comastech.com
                </a>
              </li>
              <li>
                <strong>Direccion</strong>
                <span>Comas, Lima, Peru</span>
              </li>
              <li>
                <strong>Horario</strong>
                <span>Lunes a sabado, 9:00 a 18:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}