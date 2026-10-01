import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { createOrder, uploadReceipt } from '../../api/api.js';
import useFormValidation from '../../hooks/useFormValidation.js';
import './CheckoutModal.css';

// 👇 Edita estos datos con tu info real
const PAYMENT_INFO = {
  yape: {
    label: 'Yape',
    number: '987 654 321',
    holder: 'Comas TECH',
    qr: '/qr-yape.png',
    color: '#7c3aed',
  },
  plin: {
    label: 'Plin',
    number: '987 654 321',
    holder: 'Comas TECH',
    qr: '/qr-plin.png',
    color: '#0ea5e9',
  },
};

const WHATSAPP_NUMBER = '51987654321';

export default function CheckoutModal({ curso, onClose }) {
  const { user } = useAuth();

  const form = useFormValidation({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    document_number: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('yape');
  const [planId, setPlanId] = useState(curso.payment_plans?.[0]?.id || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ============== PASO 1: Crear orden ==============
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setError(null);

    // Validar todos los campos
    if (!form.validateAll()) {
      setError('Revisa los campos marcados en rojo.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        course_id: curso.id,
        payment_plan_id: planId || null,
        full_name: form.values.full_name.trim(),
        email: form.values.email.trim().toLowerCase(),
        phone: form.values.phone.trim(),
        document_number: form.values.document_number.trim(),
        payment_method: paymentMethod,
      };
      const data = await createOrder(payload);
      setOrder(data);
    } catch (err) {
      setError(
        err?.response?.data?.message || 'No se pudo registrar la inscripcion.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ============== PASO 2: Subir comprobante ==============
  const handleUploadReceipt = async () => {
    if (!receiptFile || !order) return;
    setError(null);

    // Validación de archivo
    const MAX_MB = 5;
    if (receiptFile.size > MAX_MB * 1024 * 1024) {
      setError(`El archivo supera los ${MAX_MB} MB permitidos.`);
      return;
    }
    const okTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!okTypes.includes(receiptFile.type)) {
      setError('Solo se permiten imágenes JPG/PNG/WEBP o PDF.');
      return;
    }

    setUploading(true);
    try {
      await uploadReceipt(order.order_id, receiptFile);
      setSuccess(true);
    } catch (err) {
      setError(
        err?.response?.data?.message || 'No se pudo subir el comprobante.'
      );
    } finally {
      setUploading(false);
    }
  };

  const method = PAYMENT_INFO[paymentMethod];
  const waMessage = `Hola, acabo de inscribirme al curso "${curso.title}". Adjunto la captura de mi pago por ${method.label}. Orden #${order?.order_id ?? ''}`;
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  const currentStep = success ? 3 : order ? 2 : 1;

  // Helper para clases de error
  const fieldClass = (name) =>
    `field ${form.errors[name] && form.touched[name] ? 'has-error' : ''}`;
  const errorMsg = (name) =>
    form.errors[name] && form.touched[name] ? (
      <span className="field__error">{form.errors[name]}</span>
    ) : null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Cerrar"
          type="button"
        >
          ×
        </button>

        {/* ============ PROGRESO ============ */}
        <div className="checkout-steps">
          {[
            { n: 1, label: 'Datos' },
            { n: 2, label: 'Pago' },
            { n: 3, label: 'Listo' },
          ].map((s) => (
            <div
              key={s.n}
              className={`checkout-step ${
                currentStep === s.n ? 'is-active' : ''
              } ${currentStep > s.n ? 'is-done' : ''}`}
            >
              <span className="checkout-step__num">
                {currentStep > s.n ? '✓' : s.n}
              </span>
              <span className="checkout-step__label">{s.label}</span>
            </div>
          ))}
          <div className="checkout-steps__bar">
            <div
              className="checkout-steps__bar-fill"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        {/* ============ PASO 3: ÉXITO ============ */}
        {success && (
          <div className="modal__success">
            <div className="modal__success-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>¡Comprobante enviado!</h3>
            <p className="text-muted modal__note">
              Un administrador revisará tu pago. Una vez confirmado, el curso
              aparecerá abierto en <strong>Mis cursos</strong>.
            </p>
            <button className="btn btn--block" onClick={onClose} type="button">
              Entendido
            </button>
          </div>
        )}

        {/* ============ PASO 2: PAGO + COMPROBANTE ============ */}
        {!success && order && (
          <div className="checkout-paso">
            <header className="modal__header">
              <h3>Realiza tu pago</h3>
              <p className="text-muted">{curso.title}</p>
            </header>

            <div className="checkout-summary">
              <div className="checkout-summary__row">
                <span className="text-muted">Orden</span>
                <strong>#{order.order_id}</strong>
              </div>
              <div className="checkout-summary__row">
                <span className="text-muted">Total a pagar</span>
                <strong className="checkout-summary__amount">
                  S/ {Number(order.amount).toFixed(2)}
                </strong>
              </div>
            </div>

            <div className="pago-tabs">
              {['yape', 'plin'].map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`pago-tab ${
                    paymentMethod === m ? 'is-active' : ''
                  }`}
                  onClick={() => setPaymentMethod(m)}
                  style={{ '--tab-color': PAYMENT_INFO[m].color }}
                >
                  {PAYMENT_INFO[m].label}
                </button>
              ))}
            </div>

            <div className="pago-card">
              <div className="pago-card__qr">
                <img
                  src={method.qr}
                  alt={`QR ${method.label}`}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://placehold.co/200x200?text=QR+' + method.label;
                  }}
                />
              </div>
              <div className="pago-card__info">
                <span
                  className="pago-card__badge"
                  style={{ background: method.color }}
                >
                  {method.label}
                </span>
                <p className="pago-card__label">Número</p>
                <p className="pago-card__number">{method.number}</p>
                <p className="pago-card__holder">{method.holder}</p>
              </div>
            </div>

            <p className="text-muted modal__note">
              Escanea el QR o envía el monto al número. Luego{' '}
              <strong>sube tu captura</strong> aquí abajo.
            </p>

            <div className="upload-receipt">
              <label
                className={`upload-receipt__label ${
                  receiptFile ? 'has-file' : ''
                }`}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={(e) =>
                    setReceiptFile(e.target.files?.[0] || null)
                  }
                />
                <span className="upload-receipt__icon">
                  {receiptFile ? '✅' : '📸'}
                </span>
                <span className="upload-receipt__text">
                  {receiptFile
                    ? receiptFile.name
                    : 'Toca para subir tu captura'}
                </span>
                <span className="upload-receipt__hint text-muted">
                  {receiptFile
                    ? 'Listo para enviar'
                    : 'JPG, PNG, WEBP o PDF · máx 5 MB'}
                </span>
              </label>

              {error && <p className="text-error">{error}</p>}

              <button
                className="btn btn--block"
                type="button"
                onClick={handleUploadReceipt}
                disabled={!receiptFile || uploading}
              >
                {uploading ? 'Subiendo...' : 'Enviar comprobante'}
              </button>

              <div className="upload-receipt__divider">
                <span>o</span>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost btn--block upload-receipt__wa"
              >
                Enviar captura por WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* ============ PASO 1: DATOS ============ */}
        {!success && !order && (
          <div className="checkout-paso">
            <header className="modal__header">
              <h3>Inscripción</h3>
              <p className="text-muted">{curso.title}</p>
            </header>

            <form className="form" onSubmit={handleCreateOrder} noValidate>
              {/* Nombre */}
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

              <div className="form__row">
                {/* Correo */}
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

                {/* Teléfono: SOLO NÚMEROS, máximo 15 */}
                <label className={fieldClass('phone')}>
                  Teléfono
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
                    required
                  />
                  {errorMsg('phone')}
                </label>
              </div>

              {/* Documento: SOLO NÚMEROS, máximo 12 */}
              <label className={fieldClass('document_number')}>
                N° de documento
                <input
                  name="document_number"
                  value={form.values.document_number}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  maxLength={12}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  required
                />
                {errorMsg('document_number')}
              </label>

              {/* Plan de pago */}
              {curso.payment_plans?.length > 0 && (
                <label>
                  Plan de pago
                  <select
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value)}
                  >
                    {curso.payment_plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — S/ {Number(p.total_amount).toFixed(2)}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {/* Método de pago */}
              <div className="modal__field">
                <span className="modal__field-label">Método de pago</span>
                <div className="modal__methods">
                  {['yape', 'plin'].map((m) => (
                    <label
                      key={m}
                      className={`metodo ${
                        paymentMethod === m ? 'is-active' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value={m}
                        checked={paymentMethod === m}
                        onChange={() => setPaymentMethod(m)}
                      />
                      {PAYMENT_INFO[m].label}
                    </label>
                  ))}
                </div>
              </div>

              {error && <p className="text-error">{error}</p>}

              <button
                className="btn btn--block"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Continuar al pago'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}