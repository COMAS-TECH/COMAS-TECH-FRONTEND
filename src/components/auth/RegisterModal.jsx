import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import useFormValidation from '../../hooks/useFormValidation.js';
import './AuthModals.css';

export default function RegisterModal({ onClose, onSwitchToLogin, onSuccess }) {
  const { register } = useAuth();
  const form = useFormValidation({
    full_name: '',
    email: '',
    password: '',
    phone: '',
  });
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
      const user = await register({
        full_name: form.values.full_name.trim(),
        email: form.values.email.trim().toLowerCase(),
        password: form.values.password,
        phone: form.values.phone.trim() || null,
      });
      onSuccess?.(user);
      onClose?.();
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo registrar');
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
      aria-labelledby="register-title"
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
          <h3 className="auth__title" id="register-title">
            Crear cuenta
          </h3>
          <p className="auth__subtitle text-muted">
            Registrate para inscribirte en nuestros cursos.
          </p>
        </header>

        <form className="form auth__form" onSubmit={handleSubmit} noValidate>
          <div className={fieldClass('full_name')}>
            <label htmlFor="register-name">Nombre completo</label>
            <input
              id="register-name"
              name="full_name"
              value={form.values.full_name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              maxLength={100}
              autoComplete="name"
              required
            />
            {errorMsg('full_name')}
          </div>

          <div className={fieldClass('email')}>
            <label htmlFor="register-email">Correo</label>
            <input
              id="register-email"
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
            <label htmlFor="register-password">Contrasena</label>
            <input
              id="register-password"
              type="password"
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              maxLength={72}
              autoComplete="new-password"
              required
            />
            {errorMsg('password')}
          </div>

          <div className={fieldClass('phone')}>
            <label htmlFor="register-phone">Telefono (opcional)</label>
            <input
              id="register-phone"
              type="tel"
              name="phone"
              value={form.values.phone}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              maxLength={15}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="tel"
            />
            {errorMsg('phone')}
          </div>

          {error && <p className="text-error auth__error">{error}</p>}

          <button className="btn btn--block" type="submit" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>

          <p className="auth__switch text-muted">
            Ya tienes cuenta?{' '}
            <button type="button" onClick={onSwitchToLogin}>
              Inicia sesion
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}