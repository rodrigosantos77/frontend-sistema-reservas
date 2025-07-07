

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [reservas, setReservas] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario'); // se você salvar o usuário, remove também
    navigate('/login');
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/reservas', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setReservas(res.data))
    .catch(err => {
      console.error('Erro ao buscar reservas', err);
      alert('Erro ao carregar reservas.');
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {/* Botão de Logout no topo */}
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#e74c3c',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer',
          marginBottom: 20
        }}
      >
        Sair
      </button>

        {/* Botão Nova Reserva */}
      <button
        onClick={() => navigate('/nova-reserva')}
        style={{
          backgroundColor: '#3498db',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer',
          marginBottom: 20,
          marginLeft: 10
        }}
      >
        Nova Reserva
      </button>

      {/* Botão MInhas Reserva */}  
      <h2>Minhas Reservas</h2>
      {reservas.length === 0 ? (
        <p>Você não tem reservas cadastradas.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {reservas.map(reserva => (
            <li key={reserva._id} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
              <p><strong>Quarto:</strong> {reserva.quarto}</p>
              <p><strong>Entrada:</strong> {reserva.dataEntrada}</p>
              <p><strong>Saída:</strong> {reserva.dataSaida}</p>
              <div style={{ marginTop: 10 }}>
                <button style={{ marginRight: 10 }}>Visualizar</button>
                <button>Editar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
