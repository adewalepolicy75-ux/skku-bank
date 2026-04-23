"use client";

import { useEffect, useState } from "react";

export default function BalanceCard() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("/api/balance");
        const data = await res.json();
        setBalance(data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
      setLoading(false);
    };

    fetchBalance();
  }, []);

  return (
    <div className="balance-card">
      <h2>Your Balance</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="balance-amount">${balance.toFixed(2)}</div>
      )}
    </div>
  );
}
