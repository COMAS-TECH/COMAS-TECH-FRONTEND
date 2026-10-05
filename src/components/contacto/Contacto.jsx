import { useState } from 'react';
import { sendContact } from '../../api/api.js';
import useFormValidation from '../../hooks/useFormValidation.js';
import './Contacto.css';

export default function Contacto() {
  const form = useFormValidation({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
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
      await sendContact({
        name: form.values.name.trim(),
        email: form.values.email.trim().toLowerCase(),
        message: form.values.message.trim(),
      });
      setSent(true);
      form.reset();
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo enviar el mensaje.');
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
    <section id="contacto" className="section section--alt">
      <div className="container contacto__inner">
        <div className="contacto__info">
          <h2 className="section__title contacto__title">Contacto</h2>
          <p>
            ¿Tienes dudas sobre nuestros cursos, horarios o pagos? Escríbenos y
            te respondemos en menos de 24 horas.
          </p>
          <ul className="contacto__list">
            <li>
              <strong>Dirección:</strong> Av. Universitaria 1234, Comas, Lima
            </li>
            <li>
              <strong>WhatsApp:</strong> +51 987 654 321
            </li>
            <li>
              <strong>Email:</strong> hola@comastech.pe
            </li>
          </ul>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <label className={fieldClass('name')}>
            Nombre
            <input
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              maxLength={100}
              autoComplete="name"
              required
            />
            {errorMsg('name')}
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

          <label className={fieldClass('message')}>
            Mensaje
            <textarea
              name="message"
              rows="4"
              value={form.values.message}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              maxLength={500}
              required
            />
            {errorMsg('message')}
            <span className="field__counter text-muted">
              {form.values.message.length}/500
            </span>
          </label>

          {sent && (
            <p className="text-success">
              ¡Mensaje enviado! Te contactaremos pronto.
            </p>
          )}
          {error && <p className="text-error">{error}</p>}

          <button className="btn btn--block" type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>
      </div>
    </section>
  );
}