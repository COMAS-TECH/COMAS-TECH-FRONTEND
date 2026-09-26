import { useState } from 'react';
import { sendContact } from '../api/api.js';

const initialForm = { name: '', email: '', message: '' };

export default function Contacto() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null); // 'ok' | 'error' | null
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await sendContact(form);
      setStatus('ok');
      setForm(initialForm);
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="section section--alt">
      <div className="container contacto">
        <div className="contacto__info">
          <h2 className="section__title" style={{ textAlign: 'left' }}>Contacto</h2>
          <p>¿Tienes dudas sobre algun curso? Escribenos.</p>
          <ul>
            <li>📍 Comas, Lima - Peru</li>
            <li>📞 +51 987 654 321</li>
            <li>✉️ contacto@comastech.pe</li>
          </ul>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Correo
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Mensaje
            <textarea name="message" rows="4" value={form.message} onChange={handleChange} required />
          </label>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          {status === 'ok' && <p className="text-success">Mensaje enviado. Te responderemos pronto.</p>}
          {status === 'error' && <p className="text-error">No se pudo enviar el mensaje. Intenta de nuevo.</p>}
        </form>
      </div>
    </section>
  );
}
