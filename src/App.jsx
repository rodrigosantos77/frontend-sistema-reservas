import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NovaReserva from './pages/NovaReserva';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 Redireciona / para /login */}
        <Route path="/" element={<Login />} />
        
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
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
