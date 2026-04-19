import "../styles/sidebar.css";
import { FiLogOut } from "react-icons/fi";

export default function Sidebar({ nome, onLogout, onPerfil, onNovaReserva }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-header">
          <h2>Olá, {nome}!</h2>
        </div>

        <div className="sidebar-user-box">
          <div className="sidebar-user-avatar">👤</div>
          <span>{nome}</span>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li onClick={onNovaReserva}>Nova Reserva</li>
            <li onClick={onPerfil}>Meu Perfil</li>
          </ul>
        </nav>
      </div>

      <button className="btn-logout" onClick={onLogout}>
        <FiLogOut />
        <span>Sair</span>
      </button>
    </aside>
  );
}