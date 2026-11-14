import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import useFormValidation from '../../hooks/useFormValidation.js';
import './AuthModals.css';

export default function LoginModal({ onClose, onSwitchToRegister, onSuccess }) {
  const { login } = useAuth();
  const form = useFormValidation({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.validateAll()) {
      setError('Revisa los campos marcados en rojo.');
      return;
    }

    setLoading(true);
    try {
      const user = await login(
        form.values.email.trim().toLowerCase(),
        form.values.password
      );
      onSuccess?.(user);
      onClose?.();
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo iniciar sesion');
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (name) =>
    `field ${form.errors[name] && form.touched[name] ? 'has-error' : ''}`;
  const errorMsg = (name) =>
    form.errors[name] && form.touched[name] ? (
      <span className="field__error">{form.errors[name]}</span>
    ) : null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <div className="modal modal--auth" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Cerrar"
          type="button"
        >
          ×
        </button>

        <header className="auth__header">
          <h3 className="auth__title" id="login-title">
            Iniciar sesion
          </h3>
          <p className="auth__subtitle text-muted">
            Ingresa para inscribirte y ver tus cursos.
          </p>
        </header>

        <form className="form auth__form" onSubmit={handleSubmit} noValidate>
          <div className={fieldClass('email')}>
            <label htmlFor="login-email">Correo</label>
            <input
              id="login-email"
              type="email"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              maxLength={150}
              autoComplete="email"
              required
            />
            {errorMsg('email')}
          </div>

          <div className={fieldClass('password')}>
            <label htmlFor="login-password">Contrasena</label>
            <input
              id="login-password"
              type="password"
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              maxLength={72}
              autoComplete="current-password"
              required
            />
            {errorMsg('password')}
          </div>

          {error && <p className="text-error auth__error">{error}</p>}

          <button className="btn btn--block" type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          <p className="auth__switch text-muted">
            No tienes cuenta?{' '}
            <button type="button" onClick={onSwitchToRegister}>
              Registrate
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}