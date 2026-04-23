"use client";

import { useState } from "react";

export default function TransferForm() {
  const [formData, setFormData] = useState({
    recipientIdentifier: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Transfer successful!");
        setFormData({ recipientIdentifier: "", amount: "" });
      } else {
        setMessage("Transfer failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="transfer-form">
      <input
        type="text"
        name="recipientIdentifier"
        placeholder="Recipient phone or username"
        value={formData.recipientIdentifier}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Send Money"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
