import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Cursos from './components/Cursos.jsx';
import Capacitacion from './components/Capacitacion.jsx';
import Nosotros from './components/Nosotros.jsx';
import Contacto from './components/Contacto.jsx';
import Footer from './components/Footer.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';

export default function App() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  return (
    <>
      <Navbar />
      <Hero />
      <Cursos onInscribirme={setCursoSeleccionado} />
      <Capacitacion />
      <Nosotros />
      <Contacto />
      <Footer />

      {cursoSeleccionado && (
        <CheckoutModal
          curso={cursoSeleccionado}
          onClose={() => setCursoSeleccionado(null)}
        />
      )}
    </>
  );
}
