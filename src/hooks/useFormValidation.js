import { useState } from 'react';
import { RULES } from '../utils/validators.js';

/**
 * Hook simple para manejar formularios con validación por campo.
 *
 * @param {Object} initialValues  valores iniciales
 * @param {Object} customRules    reglas extra (opcional) por nombre de campo
 */
export default function useFormValidation(initialValues, customRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const rules = { ...RULES, ...customRules };

  const applyRule = (name, value) => {
    const rule = rules[name];
    if (!rule) return value;
    return rule.sanitize ? rule.sanitize(value) : value;
  };

  const validateField = (name, value) => {
    const rule = rules[name];
    if (!rule || !rule.validate) return null;
    return rule.validate(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const clean = applyRule(name, value);

    setValues((prev) => ({ ...prev, [name]: clean }));

    // Si ya fue tocado, valida en vivo
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, clean) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateAll = () => {
    const newErrors = {};
    let hasError = false;

    for (const name of Object.keys(rules)) {
      if (!(name in values)) continue;
      const err = validateField(name, values[name]);
      if (err) {
        newErrors[name] = err;
        hasError = true;
      }
    }
    setErrors(newErrors);
    setTouched(
      Object.keys(rules).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    );
    return !hasError;
  };

  const setFieldValue = (name, value) => {
    const clean = applyRule(name, value);
    setValues((prev) => ({ ...prev, [name]: clean }));
  };

  const reset = (next = initialValues) => {
    setValues(next);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setFieldValue,
    setValues,
    reset,
  };
}