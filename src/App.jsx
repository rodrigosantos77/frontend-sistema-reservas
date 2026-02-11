// /home/devserudo/sistema-reservas/frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NovaReserva from './pages/NovaReserva';
import Perfil from './pages/Perfil';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register'; // <-- 1. IMPORTAR O NOVO COMPONENTE

function App() {
  return (
    <Router>
      <Routes>
        
        {/* ROTAS PÚBLICAS */}
        <Route path="/" element={<Login />} />        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* <-- 2. ADICIONA A ROTA DE CADASTRO de Usuario no formularioi*/}
        
        {/* ROTAS PRIVADAS */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

          {/* 👇 pagina de perfil do usuario */}
            <Route
              path="/perfil"
                element={
                  <PrivateRoute>
                    <Perfil />
                  </PrivateRoute>
                  }
            />

            {/* 👇 pagina formulario de caddastro de reservas */}
        <Route
          path="/nova-reserva"
          element={
            <PrivateRoute>
              <NovaReserva />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;