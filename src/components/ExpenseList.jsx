export function ExpenseList({ expenses, participants, onRemoveExpense }) {
  const getPayerName = (id) => {
    const found = participants.find((p) => p.id === id);
    return found ? found.name : 'Desconhecido';
  };

  return (
    <section className="card">
      <h2>3. Histórico de Gastos ({expenses.length})</h2>
      {expenses.length === 0 ? (
        <p className="empty-text">Nenhuma despesa registrada ainda.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((exp) => (
            <li key={exp.id} className="expense-item">
              <div>
                <strong>{exp.description}</strong>
                <span className="muted">Pago por {getPayerName(exp.paidBy)}</span>
              </div>
              <div className="expense-actions">
                <span className="amount">
                  {exp.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <button
                  onClick={() => onRemoveExpense(exp.id)}
                  className="btn-icon"
                  title="Excluir gasto"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}