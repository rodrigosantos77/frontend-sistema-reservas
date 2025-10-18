
// src/pages/Register.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Importa a instância de API corrigida

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    try {
      // Rota correta para criar usuário: /api/usuarios (POST)
      // O 'api' já usa a VITE_API_URL que aponta para o Render
            await api.post('/usuarios', { 
            nome, 
            email, 
            senha, 
            tipoUsuario: 'cliente' // <-- Adiciona o campo obrigatório
            });

      
      setSucesso('Conta criada com sucesso! Redirecionando para o Login...');
      
      // Redireciona para a página de Login após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // Exibe mensagem de erro da API
      const mensagemErro = err.response?.data?.mensagem || 'Erro ao criar conta. Tente novamente.';
      setErro(mensagemErro);
      console.error("Erro no cadastro:", err);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Criar Conta</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Seu Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10, boxSizing: 'border-box' }}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10, boxSizing: 'border-box' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10, boxSizing: 'border-box' }}
        />
        <button type="submit" style={{ width: '100%', padding: 10 }}>Cadastrar</button>
      </form>
      {erro && <p style={{ color: 'red', marginTop: 10 }}>{erro}</p>}
      {sucesso && <p style={{ color: 'green', marginTop: 10 }}>{sucesso}</p>}
      
      {/* Link para Login */}
      <p style={{ marginTop: 15, textAlign: 'center' }}>
        Já tem conta? <span 
          onClick={() => navigate('/login')} 
          style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
          Faça Login
        </span>
      </p>
    </div>
  );
};

export default Register;