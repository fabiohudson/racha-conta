export function calculateSettlements(participants, expenses) {
  if (participants.length === 0 || expenses.length === 0) return [];

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const fairShare = totalSpent / participants.length;

  // 1. Calcula o saldo de cada pessoa (positivo = tem a receber, negativo = deve)
  const balances = participants.map((person) => {
    const paid = expenses
      .filter((exp) => exp.paidBy === person.id)
      .reduce((sum, exp) => sum + exp.amount, 0);

    return {
      id: person.id,
      name: person.name,
      balance: paid - fairShare,
    };
  });

  // 2. Separa devedores e credores
  const debtors = balances
    .filter((b) => b.balance < -0.01)
    .map((b) => ({ ...b, balance: Math.abs(b.balance) }))
    .sort((a, b) => b.balance - a.balance);

  const creditors = balances
    .filter((b) => b.balance > 0.01)
    .sort((a, b) => b.balance - a.balance);

  // 3. Cruza quem deve com quem tem a receber
  const transactions = [];
  let i = 0; // índice devedores
  let j = 0; // índice credores

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const amount = Math.min(debtor.balance, creditor.balance);

    transactions.push({
      from: debtor.name,
      to: creditor.name,
      amount: Number(amount.toFixed(2)),
    });

    debtor.balance -= amount;
    creditor.balance -= amount;

    if (debtor.balance < 0.01) i++;
    if (creditor.balance < 0.01) j++;
  }

  return transactions;
}