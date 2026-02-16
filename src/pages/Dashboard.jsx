import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Sidebar from "../components/Sidebar";
import ReservaCard from "../components/ReservaCard";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [reservas, setReservas] = useState([]);

  const navigate = useNavigate();

  // ✅ Usuário logado
  const usuarioString = localStorage.getItem("usuario");
  const usuario = usuarioString ? JSON.parse(usuarioString) : null;

  const nomeUsuario = usuario ? usuario.nome : "Cliente";

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  // ✅ Buscar reservas do usuário
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/reservas")
      .then((res) => {
        setReservas(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar reservas:", err.response?.data || err.message);
        alert("Erro ao carregar reservas.");
      });
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* ✅ Sidebar */}
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
          /* ✅ Scroll aparece aqui */
            
            <div className="reservas-container">
                {reservas.length === 0 ? (
                  <p>Você não tem reservas cadastradas.</p>
                ) : (
                  reservas.map((reserva) => (
                    <ReservaCard
                      key={reserva._id}
                      reserva={reserva}
                      onCancelar={(id) => {
                        setReservas((prevReservas) =>
                          prevReservas.map((r) =>
                            r._id === id
                              ? { ...r, status: "cancelada" }
                              : r
                          )
                        );
                      }}
                    />
                  ))
                )}
          </div>

        )}
      </main>
    </div>
  );
};

export default Dashboard;
