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
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal modal--auth" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Cerrar" type="button">
          ×
        </button>
        <h3 className="auth__title">Crear cuenta</h3>
        <p className="auth__subtitle text-muted">
          Regístrate para inscribirte en nuestros cursos.
        </p>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <label className={fieldClass('full_name')}>
            Nombre completo
            <input
              name="full_name"
              value={form.values.full_name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              maxLength={100}
              autoComplete="name"
              required
            />
            {errorMsg('full_name')}
          </label>

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
              autoComplete="new-password"
              required
            />
            {errorMsg('password')}
          </label>

          <label className={fieldClass('phone')}>
            Teléfono (opcional)
            <input
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
          </label>

          {error && <p className="text-error">{error}</p>}

          <button className="btn btn--block" type="submit" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>

          <p className="auth__switch text-muted">
            ¿Ya tienes cuenta?{' '}
            <button type="button" onClick={onSwitchToLogin}>
              Inicia sesión
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}