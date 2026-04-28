// lib/transactions.js
export const saveTransaction = (
  fromUser,
  toUser,
  amount,
  type,
  status,
  reference,
) => {
  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");

  const newTransaction = {
    id: Date.now(),
    date: new Date().toISOString(),
    fromUser: fromUser,
    toUser: toUser,
    amount: amount,
    type: type, // "internal", "external", "airtime", "bill"
    status: status, // "completed", "pending", "failed"
    reference: reference || `TXN${Date.now()}`,
    timestamp: Date.now(),
  };

  transactions.unshift(newTransaction); // Add to beginning
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions.slice(0, 50)),
  ); // Keep last 50

  // Update dashboard balance in localStorage
  const currentBalance = parseFloat(localStorage.getItem("balance") || "0");
  localStorage.setItem("balance", currentBalance - amount);

  return newTransaction;
};

export const getTransactions = () => {
  return JSON.parse(localStorage.getItem("transactions") || "[]");
};
