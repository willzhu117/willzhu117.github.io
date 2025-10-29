const form = document.getElementById('transaction-form');
const desc = document.getElementById('desc');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const transactionsList = document.getElementById('transactions');

const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expensesEl = document.getElementById('expenses');

let transactions = [];

function updateSummary() {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  incomeEl.textContent = income.toFixed(2);
  expensesEl.textContent = expenses.toFixed(2);
  balanceEl.textContent = balance.toFixed(2);
}

function renderTransactions() {
  transactionsList.innerHTML = '';
  transactions.forEach((t, index) => {
    const li = document.createElement('li');
    li.classList.add(t.type);
    li.innerHTML = `
      ${t.desc} <span>$${t.amount.toFixed(2)}</span>
      <button onclick="deleteTransaction(${index})">x</button>
    `;
    transactionsList.appendChild(li);
  });
  updateSummary();
}

function addTransaction(e) {
  e.preventDefault();
  const transaction = {
    desc: desc.value,
    amount: parseFloat(amount.value),
    type: type.value
  };
  transactions.push(transaction);
  renderTransactions();
  form.reset();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
}

form.addEventListener('submit', addTransaction);