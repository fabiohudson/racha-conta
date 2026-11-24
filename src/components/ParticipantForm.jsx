import { useState } from 'react';

export function ParticipantForm({ participants, onAdd, onRemove }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim());
    setName('');
  };

  return (
    <section className="card">
      <h2>1. Participantes ({participants.length})</h2>
      <form onSubmit={handleSubmit} className="inline-form">
        <input
          type="text"
          placeholder="Nome (ex: Ana)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn-primary">Adicionar</button>
      </form>

      <div className="tags-list">
        {participants.length === 0 && (
          <p className="empty-text">Adicione pelo menos 2 pessoas para começar.</p>
        )}
        {participants.map((p) => (
          <span key={p.id} className="tag">
            {p.name}
            <button onClick={() => onRemove(p.id)} aria-label={`Remover ${p.name}`}>
              ×
            </button>
          </span>
        ))}
      </div>
    </section>
  );
}