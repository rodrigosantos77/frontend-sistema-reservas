import "../styles/reservaCard.css";
import api from "../services/api";
import Swal from "sweetalert2";

import {
  FaBed,
  FaMoneyBillWave,
  FaCoffee,
  FaCalendarAlt,
  FaEdit
} from "react-icons/fa";

export default function ReservaCard({ reserva, onAtualizar }) {
  const valorFormatado = Number(reserva.valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  // ============================
  // ✅ CANCELAR RESERVA
  // ============================
  const handleCancelar = async () => {
    const confirmacao = await Swal.fire({
      title: "Cancelar reserva?",
      text: "Essa ação vai marcar a reserva como cancelada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, cancelar",
      cancelButtonText: "Não"
    });

    if (!confirmacao.isConfirmed) return;

    try {
      await api.put(`/reservas/${reserva._id}`, {
        status: "cancelada"
      });

      await Swal.fire("Cancelada!", "Reserva cancelada com sucesso.", "success");

      if (onAtualizar) onAtualizar();
    } catch (error) {
      Swal.fire("Erro!", "Não foi possível cancelar.", "error");
    }
  };

  // ============================
  // ✅ EDITAR RESERVA (MODAL)
  // ============================
  const handleEditar = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Editar Reserva",
      html: `
        <label>Data Entrada:</label>
        <input id="dataEntrada" type="date" class="swal2-input"
          value="${reserva.dataEntrada?.split("T")[0]}">

        <label>Data Saída:</label>
        <input id="dataSaida" type="date" class="swal2-input"
          value="${reserva.dataSaida?.split("T")[0]}">

        <label>Número de Pessoas:</label>
        <input id="numeroPessoas" type="number" min="1" max="4"
          class="swal2-input"
          value="${reserva.numeroPessoas || 1}">
      `,
      showCancelButton: true,
      confirmButtonText: "Salvar Alterações",
      cancelButtonText: "Cancelar",

      preConfirm: () => {
        const entrada = document.getElementById("dataEntrada").value;
        const saida = document.getElementById("dataSaida").value;
        const pessoas = Number(document.getElementById("numeroPessoas").value);

        if (!entrada || !saida) {
          Swal.showValidationMessage("Preencha as duas datas!");
          return;
        }

        if (pessoas < 1 || pessoas > 4) {
          Swal.showValidationMessage("Número de pessoas deve ser entre 1 e 4.");
          return;
        }

        return {
          dataEntrada: entrada,
          dataSaida: saida,
          numeroPessoas: pessoas
        };
      }
    });

    if (!formValues) return;

    try {
      console.log("Enviando para o backend:", formValues);

      await api.put(`/reservas/${reserva._id}`, formValues);

      await Swal.fire("Atualizada!", "Reserva editada com sucesso.", "success");

      if (onAtualizar) onAtualizar();
    } catch (error) {
      console.log("Erro vindo do backend:", error.response?.data);

      Swal.fire("Erro!", "Não foi possível editar a reserva.", "error");
    }
  };

  return (
    <div className="reserva-card">
      {/* Cabeçalho */}
      <div className="reserva-header">
        <h3>
          <FaBed /> Quarto {reserva.numeroQuarto}
        </h3>

        <span className={`status ${reserva.status?.toLowerCase()}`}>
          {reserva.status}
        </span>
      </div>

      {/* Corpo */}
      <div className="reserva-body">
        <div className="info-item">
          <FaCalendarAlt />
          <p>
            <strong>Check-in:</strong>{" "}
            {reserva.dataEntrada?.split("T")[0].split("-").reverse().join("/")}
          </p>
        </div>

        <div className="info-item">
          <FaCalendarAlt />
          <p>
            <strong>Check-out:</strong>{" "}
            {reserva.dataSaida?.split("T")[0].split("-").reverse().join("/")}
          </p>
        </div>

        <div className="info-item valor-destaque">
          <FaMoneyBillWave />
            <p>{valorFormatado}</p>
        </div>

        <div className="info-item">
          <FaCoffee />
          <p>
            <strong>Café:</strong>{" "}
            {reserva.cafeDaManha ? "Sim ☕" : "Não"}
          </p>
        </div>

        <div className="info-item">
          👥 <p><strong>Pessoas:</strong> {reserva.numeroPessoas}</p>
        </div>
      </div>

      {/* Botões */}
      <div className="reserva-footer">
        <button className="btn-cancelar" onClick={handleCancelar}>
          Cancelar
        </button>

        <button className="btn-editar" onClick={handleEditar}>
          <FaEdit /> Editar
        </button>
      </div>
    </div>
  );
}