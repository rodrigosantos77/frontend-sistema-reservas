
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/novaReserva.css';

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let novoValor = value;

    if (type === 'checkbox') novoValor = checked;

    if (
      ['valor', 'numeroQuarto', 'numeroToalhas', 'numeroLencois'].includes(name)
    ) {
      novoValor = Number(value);
    }

    setForm((prev) => ({ ...prev, [name]: novoValor }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await api.post('/reservas', form);

    alert('Reserva criada com sucesso!');
    navigate('/dashboard');
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert('Erro ao criar reserva.');
  }
};

  return (
    <div className="nova-reserva-container">
      <div className="nova-reserva-card">
        <h2>Nova Reserva</h2>
       <form onSubmit={handleSubmit}>
  <div className="form-grid">

    {/* DATA ENTRADA */}
    <div>
      <label>Data de Entrada</label>
      <input
        type="date"
        name="dataEntrada"
        value={form.dataEntrada}
        onChange={handleChange}
        required
      />
    </div>

    {/* DATA SAÍDA */}
    <div>
      <label>Data de Saída</label>
      <input
        type="date"
        name="dataSaida"
        value={form.dataSaida}
        onChange={handleChange}
        required
      />
    </div>

    {/* NÚMERO DO QUARTO */}
    <div>
      <label>Número do Quarto</label>
      <input
        type="number"
        name="numeroQuarto"
        value={form.numeroQuarto}
        onChange={handleChange}
        required
      />
    </div>

    {/* STATUS */}
    <div>
      <label>Status da Reserva</label>
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        required
      >
        <option value="pendente">Pendente</option>
        <option value="confirmada">Confirmada</option>
        <option value="cancelada">Cancelada</option>
      </select>
    </div>

    {/* VALOR */}
    <div>
      <label>Valor Cobrado (R$)</label>
      <input
        type="number"
        name="valor"
        value={form.valor}
        onChange={handleChange}
        required
      />
    </div>

    {/* FORMA PAGAMENTO */}
    <div>
      <label>Forma de Pagamento</label>
      <select
        name="formaPagamento"
        value={form.formaPagamento}
        onChange={handleChange}
        required
      >
        <option value="">Selecione</option>
        <option value="pix">Pix</option>
        <option value="dinheiro">Dinheiro</option>
        <option value="debito">Cartão Débito</option>
        <option value="credito">Cartão Crédito</option>
      </select>
    </div>

    {/* TOALHAS */}
    <div>
      <label>Quantidade de Toalhas</label>
      <input
        type="number"
        name="numeroToalhas"
        value={form.numeroToalhas}
        onChange={handleChange}
        required
      />
    </div>

    {/* LENÇÓIS */}
    <div>
      <label>Quantidade de Lençóis</label>
      <input
        type="number"
        name="numeroLencois"
        value={form.numeroLencois}
        onChange={handleChange}
        required
      />
    </div>

    {/* HORÁRIO ENTRADA */}
    <div>
      <label>Horário de Entrada</label>
      <input
        type="time"
        name="horarioEntrada"
        value={form.horarioEntrada}
        onChange={handleChange}
        required
      />
    </div>

  </div>

  {/* CAFÉ */}
  <div className="checkbox-area">
    <label>
      <input
        type="checkbox"
        name="cafeDaManha"
        checked={form.cafeDaManha}
        onChange={handleChange}
      />
      Café da manhã incluso?
    </label>
  </div>

  <button className="btn-salvar" type="submit">
    Salvar Reserva
  </button>
</form>
         
      </div>
    </div>
  );
};

export default NovaReserva;
