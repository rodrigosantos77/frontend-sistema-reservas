
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/novaReserva.css';

const NovaReserva = () => {
  const [form, setForm] = useState({
    dataEntrada: '',
    dataSaida: '',
    numeroQuarto: '',
    numeroPessoas: '',
    status: 'pendente',
    formaPagamento: '',
    numeroToalhas: '',
    numeroLencois: '',
    cafeDaManha: false,
    horarioEntrada: ''
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [quartosDisponiveis, setQuartosDisponiveis] = useState([]);
  const [quartoSelecionado, setQuartoSelecionado] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let novoValor = value;

    if (type === 'checkbox') {
      novoValor = checked;
    }

    if (
      ['numeroQuarto', 'numeroToalhas', 'numeroLencois', 'numeroPessoas'].includes(name)
    ) {
      novoValor = value === '' ? '' : Number(value);
    }

    setForm((prev) => ({ ...prev, [name]: novoValor }));
  };

  const buscarQuartosDisponiveis = async () => {
    try {
      if (!form.dataEntrada || !form.dataSaida) {
        alert('Informe data de entrada e saída primeiro.');
        return;
      }

      const response = await api.get('/reservas/quartos-disponiveis', {
        params: {
          dataEntrada: form.dataEntrada,
          dataSaida: form.dataSaida,
        },
      });

      console.log('RESPONSE.DATA:', response.data);

      const quartos = response.data.quartosDisponiveis || [];

      setQuartosDisponiveis(quartos);
      setQuartoSelecionado(null);
      setForm((prev) => ({ ...prev, numeroQuarto: '' }));
      setMostrarModal(true);
    } catch (err) {
      console.error('ERRO AO BUSCAR QUARTOS:', err.response?.data || err.message);

      alert(
        err.response?.data?.erro ||
        err.response?.data?.mensagem ||
        'Erro ao buscar quartos disponíveis.'
      );
    }
  };

  const handleSelecionarQuarto = (quarto) => {
    setForm((prev) => ({ ...prev, numeroQuarto: quarto }));
    setQuartoSelecionado(quarto);
     setMostrarModal(false); // 👈 fecha o modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/reservas', form);

      alert('Reserva criada com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(
        err.response?.data?.erro ||
        err.response?.data?.mensagem ||
        'Erro ao criar reserva.'
      );
    }
  };

  return (
    <div className="nova-reserva-container">
      <div className="nova-reserva-card">
        <h2>Nova Reserva</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
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

            <div>
              <button
                type="button"
                onClick={buscarQuartosDisponiveis}
                className="btn-buscar-quartos"
              >
                Buscar Quartos Disponíveis
              </button>
            </div>

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

            <div>
              <label>Número de Pessoas</label>
              <input
                type="number"
                name="numeroPessoas"
                min="1"
                max="4"
                value={form.numeroPessoas}
                onChange={handleChange}
                required
              />
            </div>

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

          <div className="lista-quartos">
            <h4>Quartos disponíveis:</h4>

            {quartosDisponiveis.length > 0 ? (
              <ul>
                {quartosDisponiveis.map((quarto) => (
                  <li
                    key={quarto}
                    className={
                      quartoSelecionado === quarto
                        ? 'quarto-item selecionado'
                        : 'quarto-item'
                    }
                    onClick={() => handleSelecionarQuarto(quarto)}
                  >
                    Quarto {quarto}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum quarto disponível para esse período.</p>
            )}

            {quartoSelecionado && (
              <p className="quarto-selecionado-msg">
                Quarto {quartoSelecionado} selecionado.
              </p>
            )}
          </div>

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


        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Quartos Disponíveis</h3>

              {quartosDisponiveis.length > 0 ? (
                <ul>
                  {quartosDisponiveis.map((quarto) => (
                    <li
                      key={quarto}
                      className="quarto-item"
                      onClick={() => handleSelecionarQuarto(quarto)}
                    >
                      Quarto {quarto}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum quarto disponível.</p>
              )}

              <button onClick={() => setMostrarModal(false)}>
                Fechar
              </button>
            </div>
          </div>
        )}


          <button className="btn-salvar" type="submit">
            Salvar Reserva
          </button>
        </form>
      </div>
    </div>
  );
};

export default NovaReserva;