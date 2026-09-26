import { useState } from 'react';
import { createOrder } from '../api/api.js';

const initialForm = {
  full_name: '',
  email: '',
  phone: '',
  document_number: '',
  payment_method: 'yape',
  card_number: '',
  card_expiry: '',
  card_cvv: '',
  card_brand: '',
};

export default function CheckoutModal({ curso, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [planId, setPlanId] = useState(curso.payment_plans?.[0]?.id || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Por seguridad, del formulario de tarjeta solo se envian al backend
      // los ultimos 4 digitos y la marca. Nunca se envia ni se guarda el numero
      // completo ni el CVV.
      const payload = {
        course_id: curso.id,
        payment_plan_id: planId || null,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        document_number: form.document_number,
        payment_method: form.payment_method,
        card_last4: form.payment_method === 'tarjeta' ? form.card_number.slice(-4) : undefined,
        card_brand: form.payment_method === 'tarjeta' ? (form.card_brand || 'Tarjeta') : undefined,
      };
      const data = await createOrder(payload);
      setSuccess(data);
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo procesar la inscripcion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">✕</button>

        {success ? (
          <div className="modal__success">
            <span className="modal__success-icon">✅</span>
            <h3>¡Inscripcion registrada!</h3>
            <p>Curso: <strong>{success.course}</strong></p>
            <p>Monto: <strong>S/ {Number(success.amount).toFixed(2)}</strong></p>
            <p>N° de orden: <strong>#{success.order_id}</strong></p>
            <p className="text-muted">
              Recibiras tu certificado al finalizar el curso. Te contactaremos para
              coordinar el inicio de clases.
            </p>
            <button className="btn" onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <>
            <h3>Inscribirme: {curso.title}</h3>
            <p className="text-muted">
              No necesitas crear una cuenta. Tus datos se guardan de forma segura.
            </p>

            <form className="form" onSubmit={handleSubmit}>
              <label>
                Nombre completo
                <input name="full_name" value={form.full_name} onChange={handleChange} required />
              </label>
              <label>
                Correo
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </label>
              <div className="form__row">
                <label>
                  Telefono
                  <input name="phone" value={form.phone} onChange={handleChange} required />
                </label>
                <label>
                  N° de DNI
                  <input
                    name="document_number"
                    value={form.document_number}
                    onChange={handleChange}
                    maxLength={12}
                    required
                  />
                </label>
              </div>

              {curso.payment_plans?.length > 0 && (
                <label>
                  Plan de pago
                  <select value={planId} onChange={(e) => setPlanId(e.target.value)}>
                    {curso.payment_plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} - S/ {Number(p.total_amount).toFixed(2)}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <label>Metodo de pago</label>
              <div className="form__metodos">
                <label className={`metodo ${form.payment_method === 'yape' ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="payment_method"
                    value="yape"
                    checked={form.payment_method === 'yape'}
                    onChange={handleChange}
                  />
                  Yape
                </label>
                <label className={`metodo ${form.payment_method === 'tarjeta' ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="payment_method"
                    value="tarjeta"
                    checked={form.payment_method === 'tarjeta'}
                    onChange={handleChange}
                  />
                  Tarjeta
                </label>
              </div>

              {form.payment_method === 'yape' && (
                <div className="pago-yape">
                  <div className="pago-yape__qr" aria-hidden="true">QR</div>
                  <p>
                    Yapea el monto al <strong>987 654 321</strong> (Comas TECH) y luego confirma
                    tu inscripcion. Verificaremos el pago por correo.
                  </p>
                </div>
              )}

              {form.payment_method === 'tarjeta' && (
                <div className="pago-tarjeta">
                  <label>
                    Numero de tarjeta
                    <input
                      name="card_number"
                      value={form.card_number}
                      onChange={handleChange}
                      maxLength={16}
                      placeholder="•••• •••• •••• ••••"
                      required
                    />
                  </label>
                  <div className="form__row">
                    <label>
                      Vencimiento
                      <input
                        name="card_expiry"
                        value={form.card_expiry}
                        onChange={handleChange}
                        placeholder="MM/AA"
                        required
                      />
                    </label>
                    <label>
                      CVV
                      <input
                        name="card_cvv"
                        value={form.card_cvv}
                        onChange={handleChange}
                        maxLength={4}
                        placeholder="•••"
                        required
                      />
                    </label>
                  </div>
                  <p className="text-muted" style={{ fontSize: '0.8rem' }}>
                    Por seguridad, no almacenamos tu numero de tarjeta completo ni el CVV.
                  </p>
                </div>
              )}

              {error && <p className="text-error">{error}</p>}

              <button className="btn" type="submit" disabled={loading}>
                {loading ? 'Procesando...' : 'Confirmar inscripcion'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
