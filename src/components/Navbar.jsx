import { useState } from 'react';

const LINKS = [
  { href: '#cursos', label: 'Cursos' },
  { href: '#capacitacion', label: 'Capacitacion' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <a href="#top" className="navbar__logo">
          Comas<span>TECH</span>
        </a>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#cursos" className="btn btn--sm" onClick={() => setOpen(false)}>
            Inscribirme
          </a>
        </nav>

        <button
          className="navbar__toggle"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
