import './WhatsAppFloat.css';

// Número de WhatsApp (formato internacional, sin + ni espacios)
const PHONE = '51987654321';

// Mensaje predefinido que se envía al abrir el chat
const DEFAULT_MESSAGE = 'Hola Comas TECH 👋, quisiera más información sobre sus cursos.';

export default function WhatsAppFloat({
  phone = PHONE,
  message = DEFAULT_MESSAGE,
  label = '¿Necesitas ayuda? Escríbenos',
}) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
    >
      <span className="whatsapp-float__tooltip">{label}</span>

      <span className="whatsapp-float__button">
        {/* Ícono oficial de WhatsApp (SVG inline, sin dependencias) */}
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="#fff"
            d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 1.75.802 2.464.802.945 0 2.05-.63 2.336-1.547.128-.43.143-.886.043-1.29-.06-.244-.372-.43-.715-.545-.43-.143-.99-.43-1.492-.63zM16 3C9.383 3 4 8.383 4 15c0 2.29.646 4.426 1.77 6.24L4 29l7.94-1.74A11.92 11.92 0 0 0 16 27c6.617 0 12-5.383 12-12S22.617 3 16 3zm0 21.86c-1.98 0-3.83-.6-5.36-1.62l-.386-.244-4.71 1.03 1.05-4.6-.275-.4A9.87 9.87 0 0 1 6.14 15C6.14 9.56 10.56 5.14 16 5.14S25.86 9.56 25.86 15 21.44 24.86 16 24.86z"
          />
        </svg>
      </span>
    </a>
  );
}