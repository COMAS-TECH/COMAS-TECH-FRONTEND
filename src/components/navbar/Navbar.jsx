import { useState } from 'react';
import useTheme from '../../hooks/useTheme.js';
import './Navbar.css';

const LINKS = [
  { href: '#cursos', label: 'Cursos' },
  { href: '#capacitacion', label: 'Capacitación' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <a href="#inicio" className="navbar__logo" onClick={closeMenu}>
          Comas<span>TECH</span>
        </a>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__theme"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
          >
            {theme === 'light' ? 'Oscuro' : 'Claro'}
          </button>
          <button
            type="button"
            className="navbar__toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}