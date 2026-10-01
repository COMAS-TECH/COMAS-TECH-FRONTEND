import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useTheme from '../../hooks/useTheme.js';
import { useAuth } from '../../context/AuthContext.jsx';
import LoginModal from '../auth/LoginModal.jsx';
import RegisterModal from '../auth/RegisterModal.jsx';
import './Navbar.css';

const LINKS = [
  { to: '/cursos', label: 'Cursos' },
  { to: '/capacitacion', label: 'Capacitacion' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'register' | null
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="navbar">
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo" onClick={closeMenu}>
            Comas<span>TECH</span>
          </Link>

          <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? 'is-active' : '')}
              >
                {link.label}
              </NavLink>
            ))}
            {user && (
              <NavLink to="/mis-cursos" onClick={closeMenu}>
                Mis cursos
              </NavLink>
            )}
            {user?.role === 'admin' && (
              <NavLink to="/admin" onClick={closeMenu}>
                Admin
              </NavLink>
            )}
          </nav>

          <div className="navbar__actions">
            <button
              type="button"
              className="navbar__theme"
              onClick={toggleTheme}
              aria-label="Cambiar tema"
            >
              {theme === 'light' ? 'Oscuro' : 'Claro'}
            </button>

            {user ? (
              <div className="navbar__user">
                <span className="navbar__user-name">{user.full_name.split(' ')[0]}</span>
                <button
                  className="navbar__theme"
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                className="navbar__theme"
                type="button"
                onClick={() => setAuthModal('login')}
              >
                Ingresar
              </button>
            )}

            <button
              type="button"
              className="navbar__toggle"
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {authModal === 'login' && (
        <LoginModal
          onClose={() => setAuthModal(null)}
          onSwitchToRegister={() => setAuthModal('register')}
        />
      )}
      {authModal === 'register' && (
        <RegisterModal
          onClose={() => setAuthModal(null)}
          onSwitchToLogin={() => setAuthModal('login')}
        />
      )}
    </>
  );
}