
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

  useEffect(() => {
    axios.get('http://localhost:3000/api/reservas', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setReservas(res.data))
    .catch(err => {
      console.error('Erro ao buscar reservas', err);
      alert('Erro ao carregar reservas.');
    });
  }, []);

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
