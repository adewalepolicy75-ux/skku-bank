"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Transaction History</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="transactions-list">
            {transactions.map((tx) => (
              <div key={tx.id} className="transaction-item">
                <span>{tx.recipient}</span>
                <span className={tx.type === "sent" ? "negative" : "positive"}>
                  {tx.type === "sent" ? "-" : "+"} ${tx.amount}
                </span>
                <span>{new Date(tx.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
