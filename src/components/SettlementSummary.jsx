export function SettlementSummary({ settlements }) {
  return (
    <section className="card highlight-card">
      <h2>Acerto de Contas (Pix)</h2>
      {settlements.length === 0 ? (
        <p className="empty-text">Tudo quitado! Nenhuma transferência necessária.</p>
      ) : (
        <ul className="settlement-list">
          {settlements.map((item, idx) => (
            <li key={idx} className="settlement-item">
              <span>
                <strong>{item.from}</strong> paga para <strong>{item.to}</strong>
              </span>
              <span className="badge-value">
                {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}