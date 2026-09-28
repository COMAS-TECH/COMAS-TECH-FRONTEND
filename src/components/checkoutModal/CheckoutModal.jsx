import { useState } from 'react';
import { createOrder } from '../../api/api.js';
import './CheckoutModal.css';

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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = {
        course_id: curso.id,
        payment_plan_id: planId || null,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        document_number: form.document_number,
        payment_method: form.payment_method,
        card_last4:
          form.payment_method === 'tarjeta'
            ? form.card_number.slice(-4)
            : undefined,
        card_brand:
          form.payment_method === 'tarjeta'
            ? form.card_brand || 'Tarjeta'
            : undefined,
      };
      const data = await createOrder(payload);
      setSuccess(data);
    } catch (err) {
      setError(
        err?.response?.data?.message || 'No se pudo procesar la inscripción.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Cerrar"
          type="button"
        >
          ×
        </button>

        {success ? (
          <div className="modal__success">
            <div className="modal__success-icon">OK</div>
            <h3>Inscripción registrada</h3>
            <dl className="modal__summary">
              <div>
                <dt>Curso</dt>
                <dd>{success.course}</dd>
              </div>
              <div>
                <dt>Monto</dt>
                <dd>S/ {Number(success.amount).toFixed(2)}</dd>
              </div>
              <div>
                <dt>N° de orden</dt>
                <dd>#{success.order_id}</dd>
              </div>
            </dl>
            <p className="text-muted modal__note">
              Recibirás tu certificado al finalizar el curso. Nos pondremos en
              contacto para coordinar el inicio de clases.
            </p>
            <button className="btn" onClick={onClose} type="button">
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <header className="modal__header">
              <h3>Inscripción</h3>
              <p className="text-muted">{curso.title}</p>
            </header>

            <form className="form" onSubmit={handleSubmit}>
              <label>
                Nombre completo
                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="form__row">
                <label>
                  Correo
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Teléfono
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <label>
                N° de documento
                <input
                  name="document_number"
                  value={form.document_number}
                  onChange={handleChange}
                  maxLength={12}
                  required
                />
              </label>

              {curso.payment_plans?.length > 0 && (
                <label>
                  Plan de pago
                  <select
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value)}
                  >
                    {curso.payment_plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} - S/ {Number(p.total_amount).toFixed(2)}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <div className="modal__field">
                <span className="modal__field-label">Método de pago</span>
                <div className="modal__methods">
                  <label
                    className={`metodo ${
                      form.payment_method === 'yape' ? 'is-active' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value="yape"
                      checked={form.payment_method === 'yape'}
                      onChange={handleChange}
                    />
                    Yape
                  </label>
                  <label
                    className={`metodo ${
                      form.payment_method === 'tarjeta' ? 'is-active' : ''
                    }`}
                  >
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
              </div>

              {form.payment_method === 'yape' && (
                <div className="pago-yape">
                  <p>
                    Realiza el pago por Yape al número{' '}
                    <strong>987 654 321</strong> (Comas TECH) y confirma tu
                    inscripción. Verificaremos el pago por correo.
                  </p>
                </div>
              )}

              {form.payment_method === 'tarjeta' && (
                <div className="pago-tarjeta">
                  <label>
                    Número de tarjeta
                    <input
                      name="card_number"
                      value={form.card_number}
                      onChange={handleChange}
                      maxLength={16}
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
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
                        inputMode="numeric"
                        placeholder="000"
                        required
                      />
                    </label>
                  </div>
                  <p className="text-muted modal__note">
                    Por seguridad no almacenamos el número completo de la
                    tarjeta ni el CVV.
                  </p>
                </div>
              )}

              {error && <p className="text-error">{error}</p>}

              <button className="btn" type="submit" disabled={loading}>
                {loading ? 'Procesando...' : 'Confirmar inscripción'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}