export default function Sidebar({ nome, onLogout, onNovaReserva }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Olá, {nome}!</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li onClick={onNovaReserva}>Minhas Reservas</li>
          <li>Meu Perfil</li>
          <li>Histórico</li>
        </ul>
      </nav>
      <button className="btn-logout" onClick={onLogout}>Sair</button>
    </aside>
  );
}
