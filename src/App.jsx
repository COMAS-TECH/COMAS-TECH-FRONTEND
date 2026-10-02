import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import CheckoutModal from './components/checkoutModal/CheckoutModal.jsx';
import WhatsAppFloat from './components/whatsappFloat/WhatsAppFloat.jsx';
import LoginModal from './components/auth/LoginModal.jsx';
import AdminRoute from './components/AdminRoute/AdminRoute.jsx';

import Home from './pages/Home/Home.jsx';
import CursosPage from './pages/Cursos/CursosPage.jsx';
import CapacitacionPage from './pages/Capacitacion/CapacitacionPage.jsx';
import NosotrosPage from './pages/Nosotros/NosotrosPage.jsx';
import ContactoPage from './pages/Contacto/ContactoPage.jsx';
import MisCursosPage from './pages/MisCursos/MisCursosPage.jsx';
import AdminPage from './pages/Admin/AdminPage.jsx';
import AdminCursos from './pages/AdminCursos/AdminCursos.jsx';
import AdminCursoEdit from './pages/AdminCursoEdit/AdminCursoEdit.jsx';
import AdminVideo from './pages/AdminVideo/AdminVideo.jsx';

import useScrollTop from './hooks/useScrollTop.js';
import { useAuth } from './context/AuthContext.jsx';

export default function App() {
  const { user } = useAuth();
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useScrollTop();

  const handleInscribirme = (curso) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setCursoSeleccionado(curso);
  };

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home onInscribirme={handleInscribirme} />} />
          <Route
            path="/cursos"
            element={<CursosPage onInscribirme={handleInscribirme} />}
          />
          <Route path="/capacitacion" element={<CapacitacionPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/mis-cursos" element={<MisCursosPage />} />

          {/* Admin protegido */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/cursos"
            element={
              <AdminRoute>
                <AdminCursos />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/cursos/:id"
            element={
              <AdminRoute>
                <AdminCursoEdit />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/video"
            element={
              <AdminRoute>
                <AdminVideo />
              </AdminRoute>
            }
          />

          <Route path="*" element={<Home onInscribirme={handleInscribirme} />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />

      {cursoSeleccionado && (
        <CheckoutModal
          curso={cursoSeleccionado}
          onClose={() => setCursoSeleccionado(null)}
        />
      )}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => setShowLogin(false)}
          onSuccess={() => setShowLogin(false)}
        />
      )}
    </>
  );
}