import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            Comas<span>TECH</span>
          </span>
          <p>Competencias digitales para jóvenes de Comas.</p>
        </div>

        <nav className="footer__links">
          <a href="#cursos">Cursos</a>
          <a href="#capacitacion">Capacitación</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </div>

      <div className="container footer__bottom">
        <span>© {year} Comas TECH. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}