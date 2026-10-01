import { Link } from 'react-router-dom';
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
         <p>Competencias digitales para todas las edades en Comas.</p>
        </div>

        <nav className="footer__links">
          <Link to="/cursos">Cursos</Link>
          <Link to="/capacitacion">Capacitación</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
      </div>

      <div className="container footer__bottom">
        <span>© {year} Comas TECH. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}