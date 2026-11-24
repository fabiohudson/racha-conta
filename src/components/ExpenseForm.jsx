import { useState } from 'react';

export function ExpenseForm({ participants, onAddExpense }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount.replace(',', '.'));
    if (!description.trim() || isNaN(numericAmount) || numericAmount <= 0 || !paidBy) {
      return;
    }

    onAddExpense({
      description: description.trim(),
      amount: numericAmount,
      paidBy,
    });

    setDescription('');
    setAmount('');
  };

  const isDisabled = participants.length < 2;

  return (
    <section className="card">
      <h2>2. Lançar Despesa</h2>
      <form onSubmit={handleSubmit} className="stack-form">
        <input
          type="text"
          placeholder="O que foi pago? (ex: Mercado, Uber)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isDisabled}
        />

        <div className="form-row">
          <input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="Valor (R$)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isDisabled}
          />

          <select
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            disabled={isDisabled}
          >
            <option value="">Quem pagou?</option>
            {participants.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary" disabled={isDisabled}>
          {isDisabled ? 'Cadastre 2+ participantes primeiro' : 'Registrar Gasto'}
        </button>
      </form>
    </section>
  );
}