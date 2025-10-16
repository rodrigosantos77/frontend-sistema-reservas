
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import ReservaCard from '../components/ReservaCard';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [reservas, setReservas] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  // No Dashboard.jsx, dentro do useEffect
useEffect(() => {
    const token = localStorage.getItem('token'); // GARANTIR que estamos lendo aqui

    if (!token) {
        console.log("Token não encontrado, redirecionando para login.");
        navigate('/login');
        return; // Sai do useEffect se não tiver token
    }

    api.get('/reservas', {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setReservas(res.data))
    .catch(err => {
        console.error('Erro ao buscar reservas', err);
        //  inspecionar o erro para ver se é 401 ou 404
        alert('Erro ao carregar reservas.');
    });
}, [navigate]); // Removendo o '[token]' e usando '[navigate]'

  return (
    <div className="dashboard-container">
      <Sidebar nome="Rodrigo" onLogout={handleLogout} onNovaReserva={() => navigate('/nova-reserva')} />
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
