export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© {new Date().getFullYear()} Comas TECH. Todos los derechos reservados.</span>
        <div className="footer__links">
          <a href="#cursos">Cursos</a>
          <a href="#capacitacion">Capacitacion</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
