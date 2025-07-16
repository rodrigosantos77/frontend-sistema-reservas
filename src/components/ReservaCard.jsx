export default function ReservaCard({ reserva }) {
  return (
    <div className="reserva-card">
      <img src={reserva.imagemURL || "/default.jpg"} alt="Quarto" />
      <div className="reserva-info">
        <p><strong>Check-in:</strong> {new Date(reserva.dataEntrada).toLocaleDateString('pt-BR')}</p>
        <p><strong>Check-out:</strong> {new Date(reserva.dataSaida).toLocaleDateString('pt-BR')}</p>
        <p>{reserva.quantidadePessoas || 1} pessoa(s)</p>
      </div>
          <div className="reserva-status">
                    <span className={`status ${reserva.status?.toLowerCase() || 'pendente'}`}>
                      {reserva.status || 'Pendente'}
                    </span>
                    <div className="botoes-reserva">
                      <button className="btn-cancelar">Cancelar</button>
                      <button className="btn-editar">Editar</button>
                    </div>
          </div>

    </div>
  );
}
