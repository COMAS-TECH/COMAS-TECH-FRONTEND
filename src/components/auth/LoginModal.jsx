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
      setError(err?.response?.data?.message || 'No se pudo iniciar sesión');
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
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal modal--auth" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Cerrar" type="button">
          ×
        </button>
        <h3 className="auth__title">Iniciar sesión</h3>
        <p className="auth__subtitle text-muted">
          Ingresa para inscribirte y ver tus cursos.
        </p>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <label className={fieldClass('email')}>
            Correo
            <input
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
          </label>

          <label className={fieldClass('password')}>
            Contraseña
            <input
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
          </label>

          {error && <p className="text-error">{error}</p>}

          <button className="btn btn--block" type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          <p className="auth__switch text-muted">
            ¿No tienes cuenta?{' '}
            <button type="button" onClick={onSwitchToRegister}>
              Regístrate
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}