// ============================================
// VALIDADORES Y SANITIZADORES
// ============================================

/** Solo dígitos */
export const onlyDigits = (value) => String(value ?? '').replace(/\D/g, '');

/** Solo letras (incluye acentos y ñ), espacios y guiones */
export const onlyLetters = (value) =>
  String(value ?? '').replace(/[^a-zA-ZÀ-ÿñÑ\s'-]/g, '');

/**
 * Bloquea caracteres potencialmente peligrosos:
 * < > " ' ` ; \ { } $ -- y saltos de línea
 */
export const sanitizeText = (value) =>
  String(value ?? '')
    .replace(/[<>"'`;\\{}$]/g, '')
    .replace(/--/g, '')
    .replace(/\s{2,}/g, ' ');

/** Solo números, con longitud máxima */
export const numericInput = (value, maxLength = 20) =>
  onlyDigits(value).slice(0, maxLength);

/** Email básico */
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email ?? '').trim());

/** Teléfono: 6 a 15 dígitos */
export const isValidPhone = (phone) => {
  const digits = onlyDigits(phone);
  return digits.length >= 6 && digits.length <= 15;
};

/** DNI peruano: 8 dígitos. Carnet ext.: 9-12 dígitos. */
export const isValidDocument = (doc) => {
  const digits = onlyDigits(doc);
  return digits.length >= 8 && digits.length <= 12;
};

/** Nombre: al menos 3 letras */
export const isValidName = (name) => {
  const clean = sanitizeText(name).trim();
  return clean.length >= 3 && /[a-zA-ZÀ-ÿñÑ]/.test(clean);
};

/** Contraseña: 6-72 caracteres (límite bcrypt) */
export const isValidPassword = (pass) => {
  const p = String(pass ?? '');
  return p.length >= 6 && p.length <= 72;
};

/** Texto libre: 10 a 500 caracteres */
export const isValidMessage = (msg) => {
  const m = sanitizeText(msg).trim();
  return m.length >= 10 && m.length <= 500;
};

/** Formato MM/AA con validación real del mes */
export const isValidCardExpiry = (value) => {
  const clean = onlyDigits(value);
  if (clean.length !== 4) return false;
  const month = Number(clean.slice(0, 2));
  return month >= 1 && month <= 12;
};

/** Vencimiento de tarjeta formateado a MM/AA */
export const formatCardExpiry = (value) => {
  const clean = onlyDigits(value).slice(0, 4);
  if (clean.length <= 2) return clean;
  return `${clean.slice(0, 2)}/${clean.slice(2)}`;
};

/** Máscara para número de tarjeta: 0000 0000 0000 0000 */
export const formatCardNumber = (value) =>
  onlyDigits(value)
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();

// ============================================
// REGLAS POR CAMPO
// ============================================
export const RULES = {
  full_name: {
    maxLength: 100,
    sanitize: (v) => sanitizeText(v).slice(0, 100),
    validate: (v) =>
      isValidName(v) ? null : 'Ingresa tu nombre completo (mín. 3 letras).',
  },
  name: {
    maxLength: 100,
    sanitize: (v) => sanitizeText(v).slice(0, 100),
    validate: (v) =>
      isValidName(v) ? null : 'Ingresa tu nombre (mín. 3 letras).',
  },
  email: {
    maxLength: 150,
    sanitize: (v) => sanitizeText(v).toLowerCase().slice(0, 150),
    validate: (v) =>
      isValidEmail(v) ? null : 'Ingresa un correo válido.',
  },
  phone: {
    maxLength: 15,
    sanitize: (v) => numericInput(v, 15),
    validate: (v) =>
      isValidPhone(v) ? null : 'Ingresa un teléfono válido (6 a 15 dígitos).',
  },
  document_number: {
    maxLength: 12,
    sanitize: (v) => numericInput(v, 12),
    validate: (v) =>
      isValidDocument(v) ? null : 'El documento debe tener 8 a 12 dígitos.',
  },
  password: {
    maxLength: 72,
    sanitize: (v) => String(v ?? '').slice(0, 72),
    validate: (v) =>
      isValidPassword(v)
        ? null
        : 'La contraseña debe tener entre 6 y 72 caracteres.',
  },
  message: {
    maxLength: 500,
    sanitize: (v) => sanitizeText(v).slice(0, 500),
    validate: (v) =>
      isValidMessage(v) ? null : 'El mensaje debe tener 10 a 500 caracteres.',
  },
  card_number: {
    maxLength: 19,
    sanitize: (v) => formatCardNumber(v),
    validate: (v) =>
      onlyDigits(v).length === 16 ? null : 'La tarjeta debe tener 16 dígitos.',
  },
  card_expiry: {
    maxLength: 5,
    sanitize: (v) => formatCardExpiry(v),
    validate: (v) =>
      isValidCardExpiry(v) ? null : 'Formato MM/AA inválido.',
  },
  card_cvv: {
    maxLength: 4,
    sanitize: (v) => numericInput(v, 4),
    validate: (v) =>
      onlyDigits(v).length >= 3 ? null : 'El CVV debe tener 3 o 4 dígitos.',
  },
};