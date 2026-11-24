import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ParticipantForm } from './components/ParticipantForm';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { SettlementSummary } from './components/SettlementSummary';
import { calculateSettlements } from './utils/calculateDebts';
import './App.css';

export default function App() {
  const [participants, setParticipants] = useState(() => {
    const saved = localStorage.getItem('rc_participants');
    return saved ? JSON.parse(saved) : [];
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('rc_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('rc_participants', JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    localStorage.setItem('rc_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addParticipant = (name) => {
    const newPerson = { id: crypto.randomUUID(), name };
    setParticipants((prev) => [...prev, newPerson]);
  };

  const removeParticipant = (id) => {
    const hasExpenses = expenses.some((exp) => exp.paidBy === id);
    if (hasExpenses) {
      alert('Remova primeiro as despesas pagas por este participante.');
      return;
    }
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const addExpense = (expenseData) => {
    const newExpense = { id: crypto.randomUUID(), ...expenseData };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleReset = () => {
    if (window.confirm('Deseja apagar todos os participantes e despesas?')) {
      setParticipants([]);
      setExpenses([]);
    }
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const settlements = calculateSettlements(participants, expenses);

  return (
    <div className="container">
      <Header
        totalSpent={totalSpent}
        participantCount={participants.length}
        onReset={handleReset}
      />

      <main className="grid-layout">
        <div className="column">
          <ParticipantForm
            participants={participants}
            onAdd={addParticipant}
            onRemove={removeParticipant}
          />
          <ExpenseForm
            participants={participants}
            onAddExpense={addExpense}
          />
        </div>

        <div className="column">
          <SettlementSummary settlements={settlements} />
          <ExpenseList
            expenses={expenses}
            participants={participants}
            onRemoveExpense={removeExpense}
          />
        </div>
      </main>
    </div>
  );
}