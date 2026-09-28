import { useState } from 'react';
import Navbar from './components/navbar/Navbar.jsx';
import Hero from './components/hero/Hero.jsx';
import Cursos from './components/cursos/Cursos.jsx';
import Capacitacion from './components/capacitacion/Capacitacion.jsx';
import Nosotros from './components/nosotros/Nosotros.jsx';
import Contacto from './components/contacto/Contacto.jsx';
import Footer from './components/footer/Footer.jsx';
import CheckoutModal from './components/checkoutModal/CheckoutModal.jsx';

export default function App() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Cursos onInscribirme={setCursoSeleccionado} />
        <Capacitacion />
        <Nosotros />
        <Contacto />
      </main>
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