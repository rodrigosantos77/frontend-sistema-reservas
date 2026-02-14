import "../styles/reservaCard.css";
import {
  FaBed,
  FaMoneyBillWave,
  FaCoffee,
  FaCalendarAlt
} from "react-icons/fa";

export default function ReservaCard({ reserva }) {

  console.log("📌 Reserva dentro do Card:", reserva);

  return (
    <div className="reserva-card">

      {/* 🔹 Cabeçalho */}
      <div className="reserva-header">
        <h3>
          <FaBed /> Quarto {reserva.numeroQuarto}
        </h3>

        <span className={`status ${reserva.status?.toLowerCase() || "pendente"}`}>
          {reserva.status || "Pendente"}
        </span>
      </div>

      {/* 🔹 Corpo */}
      <div className="reserva-body">

        {/* Check-in */}
        <div className="info-item">
          <FaCalendarAlt />
          <p>
            <strong>Check-in:</strong>{" "}
            {new Date(reserva.dataEntrada).toLocaleDateString("pt-BR")}
          </p>
        </div>

        {/* Check-out */}
        <div className="info-item">
          <FaCalendarAlt />
          <p>
            <strong>Check-out:</strong>{" "}
            {new Date(reserva.dataSaida).toLocaleDateString("pt-BR")}
          </p>
        </div>

        {/* Valor */}
        <div className="info-item">
          <FaMoneyBillWave />
          <p>
            <strong>Valor:</strong> R$ {reserva.valor}
          </p>
        </div>

        {/* Café */}
        <div className="info-item">
          <FaCoffee />
          <p>
            <strong>Café da manhã:</strong>{" "}
            {reserva.cafeDaManha ? "Sim ☕" : "Não"}
          </p>
        </div>
      </div>

      {/* 🔹 Botões */}
      <div className="reserva-footer">
        <button className="btn-cancelar">Cancelar</button>
        <button className="btn-editar">Editar</button>
      </div>

    </div>
  );
}
