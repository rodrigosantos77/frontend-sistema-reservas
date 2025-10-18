// /home/devserudo/sistema-reservas/frontend/src/pages/Dashboard.jsx

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import ReservaCard from '../components/ReservaCard';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [reservas, setReservas] = useState([]);
  
  // 1. LEITURA CORRETA DO USUÁRIO E TOKEN
  const usuarioString = localStorage.getItem('usuario'); // Lê a string JSON do usuário
  const usuario = usuarioString ? JSON.parse(usuarioString) : null; // Converte para objeto
  const nomeUsuario = usuario ? usuario.nome : 'Cliente'; // Obtém o nome ou um valor padrão

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  useEffect(() => {
    // Leitura do token aqui para garantir que está atualizado
    const currentToken = localStorage.getItem('token'); 

    if (!currentToken) {
        console.log("Token não encontrado, redirecionando para login.");
        navigate('/login');
        return;
    }

    api.get('/api/reservas', {
        headers: { Authorization: `Bearer ${currentToken}` } // Usa o token do usuário logado (Usuario)
    })
    .then(res => setReservas(res.data))
    .catch(err => {
        // Se o token do Carlos for inválido/expirado, aqui teremos um 401
        console.error('Erro ao buscar reservas', err);
        alert('Erro ao carregar reservas.');
    });
  }, [navigate]); 

  return (
    <div className="dashboard-container">
      {/* 2. CORREÇÃO: Usa o nome dinâmico lido do localStorage */}
      <Sidebar nome={nomeUsuario} onLogout={handleLogout} onNovaReserva={() => navigate('/nova-reserva')} />
      <main className="dashboard-main">
        <h1>Minhas Reservas</h1>
        {reservas.length === 0 ? (
          <p>Você não tem reservas cadastradas.</p>
        ) : (
          reservas.map(reserva => (
            <ReservaCard key={reserva._id} reserva={reserva} />
          ))
        )}
      </main>
    </div>
  );
};

export default Dashboard;