export function Header({ totalSpent, participantCount, onReset }) {
  const perPerson = participantCount > 0 ? totalSpent / participantCount : 0;

  return (
    <header className="header">
      <div>
        <h1>RachaConta</h1>
        <p className="subtitle">Divisão justa de gastos em grupo</p>
      </div>

      <div className="header-stats">
        <div className="stat-box">
          <span>Total Gasto</span>
          <strong>
            {totalSpent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </strong>
        </div>
        <div className="stat-box">
          <span>Por Pessoa</span>
          <strong>
            {perPerson.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </strong>
        </div>
        <button onClick={onReset} className="btn-danger-outline" title="Limpar tudo">
          Resetar
        </button>
      </div>
    </header>
  );
}