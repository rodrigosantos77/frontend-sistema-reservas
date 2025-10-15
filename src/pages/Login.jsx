import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  // Estados para armazenar os dados do formulário e mensagens
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    try {
      // Faz a requisição POST para login
      const response = await api.post('/usuarios/login', { email, senha });
      const { token, usuario } = response.data;

      // Armazena token e dados do usuário no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      setSucesso(`Bem-vindo, ${usuario.nome}!`);
      navigate('/dashboard'); // redireciona após login

      // TODO: redirecionar para dashboard após login, por exemplo usando react-router
      // ex: navigate('/dashboard');

    } catch (err) {
      // Exibe mensagem de erro
      setErro('Credenciais inválidas ou erro no servidor.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" style={{ width: '100%', padding: 10 }}>Entrar</button>
      </form>
      {erro && <p style={{ color: 'red', marginTop: 10 }}>{erro}</p>}
      {sucesso && <p style={{ color: 'green', marginTop: 10 }}>{sucesso}</p>}
    </div>
  );
};

export default Login;
