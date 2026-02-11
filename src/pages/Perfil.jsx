import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/perfil.css";

const Perfil = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Pega o usuário salvo no localStorage
    const usuarioSalvo = localStorage.getItem("usuario");

    if (!usuarioSalvo) {
      alert("Usuário não encontrado. Faça login novamente.");
      navigate("/login");
      return;
    }

    setUsuario(JSON.parse(usuarioSalvo));
  }, [navigate]);

  if (!usuario) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      <h1>Meu Perfil</h1>

      <div className="perfil-card">
        <p>
          <strong>Nome:</strong> {usuario.nome}
        </p>

        <p>
          <strong>Email:</strong> {usuario.email}
        </p>

        <p>
          <strong>Tipo de Usuário:</strong> {usuario.tipoUsuario}
        </p>

        <button className="btn-voltar" onClick={() => navigate("/dashboard")}>
          Voltar para Dashboard
        </button>
      </div>
    </div>
  );
};

export default Perfil;
