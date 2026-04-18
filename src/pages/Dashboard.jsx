import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Sidebar from "../components/Sidebar";
import ReservaCard from "../components/ReservaCard";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [reservas, setReservas] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("todas");
  const navigate = useNavigate();

  const totalFaturado = reservas.reduce((total, reserva) => {
    return total + Number(reserva.valor || 0);
  }, 0);

  const totalFormatado = totalFaturado.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const reservasFiltradas =
    filtroStatus === "todas"
      ? reservas
      : reservas.filter(
          (reserva) => reserva.status?.toLowerCase() === filtroStatus
        );

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

  // ==============================
  // ✅ Função oficial para carregar reservas
  // ==============================
  const carregarReservas = () => {
    api
      .get("/reservas")
      .then((res) => {
        setReservas(res.data);
      })
      .catch((err) => {
        console.error(
          "Erro ao buscar reservas:",
          err.response?.data || err.message
        );
        alert("Erro ao carregar reservas.");
      });
  };

  // ==============================
  // ✅ Carrega reservas quando abrir Dashboard
  // ==============================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    carregarReservas();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Sidebar
        nome={nomeUsuario}
        onLogout={handleLogout}
        onNovaReserva={() => navigate("/nova-reserva")}
        onPerfil={() => navigate("/perfil")}
      />

      <main className="dashboard-main">
        <h1>Minhas Reservas</h1>
        <h2 className="total-faturado">💰 Total faturado: {totalFormatado}</h2>

        <div className="filtros-reservas">
          <button
            className={filtroStatus === "todas" ? "filtro-btn ativo" : "filtro-btn"}
            onClick={() => setFiltroStatus("todas")}
          >
            Todas
          </button>

          <button
            className={filtroStatus === "pendente" ? "filtro-btn ativo" : "filtro-btn"}
            onClick={() => setFiltroStatus("pendente")}
          >
            Pendentes
          </button>

          <button
            className={filtroStatus === "checkin" ? "filtro-btn ativo" : "filtro-btn"}
            onClick={() => setFiltroStatus("checkin")}
          >
            Check-in
          </button>

          <button
            className={filtroStatus === "checkout" ? "filtro-btn ativo" : "filtro-btn"}
            onClick={() => setFiltroStatus("checkout")}
          >
            Checkout
          </button>

          <button
            className={filtroStatus === "cancelada" ? "filtro-btn ativo" : "filtro-btn"}
            onClick={() => setFiltroStatus("cancelada")}
          >
            Canceladas
          </button>
        </div>

        {reservasFiltradas.length === 0 ? (
          <p>Nenhuma reserva encontrada para esse filtro.</p>
        ) : (
          <div className="reservas-container">
            {reservasFiltradas.map((reserva) => (
              <ReservaCard
                key={reserva._id}
                reserva={reserva}
                onAtualizar={carregarReservas}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;