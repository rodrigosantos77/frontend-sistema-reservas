
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NovaReserva = () => {
  const [form, setForm] = useState({
    dataEntrada: '',
    dataSaida: '',
    numeroQuarto: '',
    status: 'pendente',
    valor: '',
    formaPagamento: '',
    numeroToalhas: '',
    numeroLencois: '',
    cafeDaManha: false,
    horarioEntrada: ''
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // ponto de modificacao para aparecer os erros 
 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  let novoValor = value;

  if (type === 'number') {
    novoValor = Number(value);
  }

  if (type === 'checkbox') {
    novoValor = checked;
  }

  // Converte campos específicos que devem ser número
  if (['valor', 'numeroQuarto', 'numeroToalhas', 'numeroLencois'].includes(name)) {
    novoValor = Number(value);
  }

  setForm(prev => ({ ...prev, [name]: novoValor }));
};


// <- veja no console do navegador    
  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Dados enviados:", form); // <- veja no console do navegador

  try {
    await axios.post('http://localhost:3000/api/reservas', form, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert('Reserva criada com sucesso!');
    navigate('/dashboard');
  } catch (err) {
    console.error('Erro ao criar reserva:', err.response?.data || err.message);
    alert(`Erro: ${err.response?.data?.erro || 'Erro ao criar reserva.'}`);
    if (err.response?.data?.faltando) {
      console.log('Campos faltando:', err.response.data.faltando);
    }
  }
};

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h2>Nova Reserva</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="dataEntrada" onChange={handleChange} required placeholder="Data de Entrada" />
        <input type="date" name="dataSaida" onChange={handleChange} required placeholder="Data de Saída" />
        <input type="text" name="numeroQuarto" onChange={handleChange} required placeholder="Número do Quarto" />
        <input type="text" name="valor" onChange={handleChange} required placeholder="Valor" />
        <input type="text" name="formaPagamento" onChange={handleChange} required placeholder="Forma de Pagamento" />
        <input type="number" name="numeroToalhas" onChange={handleChange} required placeholder="Toalhas" />
        <input type="number" name="numeroLencois" onChange={handleChange} required placeholder="Lençóis" />
        <input type="time" name="horarioEntrada" onChange={handleChange} required placeholder="Horário de Entrada" />
        <label>
          <input type="checkbox" name="cafeDaManha" onChange={handleChange} />
          Café da manhã incluso
        </label>
        <br /><br />
        <button type="submit">Salvar Reserva</button>
      </form>
    </div>
  );
};

export default NovaReserva;
