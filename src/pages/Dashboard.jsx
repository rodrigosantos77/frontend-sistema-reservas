import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';
import Sidebar from '../components/Sidebar';
import ReservaCard from '../components/ReservaCard';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [reservas, setReservas] = useState([]);

  // ✅ Leitura correta do usuário logado
  const usuarioString = localStorage.getItem('usuario');
  const usuario = usuarioString ? JSON.parse(usuarioString) : null;

  const nomeUsuario = usuario ? usuario.nome : 'Cliente';

  const navigate = useNavigate();

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  // ✅ Botão Criar Nova Reserva
  const handleNovaReserva = () => {
    navigate('/nova-reserva');
  };

  // ✅ Botão Meu Perfil
  const handlePerfil = () => {
    navigate('/perfil');
  };

  // ✅ Buscar reservas do usuário logado
  useEffect(() => {
    const currentToken = localStorage.getItem('token');

    if (!currentToken) {
      console.log("Token não encontrado, redirecionando...");
      navigate('/login');
      return;
    }

    api.get("/reservas")
  .then(res => {
    console.log("Resposta da API:", res.data);
    console.log("Dados que vieram (res.data):", res.data);

    setReservas(res.data);
  })
  .catch(err => {
    console.error("Erro ao buscar reservas:", err.response?.data || err.message);
  });

  }, [navigate]);

  return (
    <div className="dashboard-container">

      {/* ✅ Sidebar com botões funcionando */}
            <Sidebar
            nome={nomeUsuario}
            onLogout={handleLogout}
            onNovaReserva={() => navigate("/nova-reserva")}
            onPerfil={() => navigate("/perfil")}
            />

      {/* ✅ Conteúdo principal */}
      <main className="dashboard-main">
        <h1>Minhas Reservas</h1>

        {reservas.length === 0 ? (
  <p>Você não tem reservas cadastradas.</p>
) : (
  reservas.map((reserva) => {

     console.log("Reserva completa:", reserva);

    return (
      <ReservaCard key={reserva._id} reserva={reserva} />
    );
  })
)}

      </main>
    </div>
  );
};

export default Dashboard;
