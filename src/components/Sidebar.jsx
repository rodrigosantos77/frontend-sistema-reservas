export default function Sidebar({ nome, onLogout, onPerfil, onNovaReserva }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Olá, {nome}!</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li onClick={onNovaReserva}>Nova Reserva</li>
          <li onClick={onPerfil}>Meu Perfil</li>
        </ul>
      </nav>

      <button className="btn-logout" onClick={onLogout}>
        Sair
      </button>
    </aside>
  );
}
