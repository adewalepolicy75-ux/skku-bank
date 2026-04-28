"use client";
import BottomNav from "../../../components/BottomNav";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveTransaction } from "../../../lib/transactions";

import {
  Bolt,
 
  Send,
  User,
  Coins,

  CheckCircle,
  Home,
} from "lucide-react";

export default function SendMoneyPage() {
  const router = useRouter();
  const [toPhone, setToPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [balance, setBalance] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const phone = localStorage.getItem("userPhone");
    const savedBalance = localStorage.getItem("balance");

    if (!loggedIn) {
      router.push("/login");
    } else {
      setUserPhone(phone || "");
      setBalance(parseFloat(savedBalance || "0"));
    }
  }, [router]);

  
  // Inside handleSend function, after updating balances:
  const handleSend = (e) => {
    e.preventDefault();

    const sendAmount = parseFloat(amount);

    if (sendAmount > balance) {
      alert("Insufficient balance!");
      return;
    }

    if (toPhone === userPhone) {
      alert("You cannot send money to yourself!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("Wire Transfer_users") || "[]");
    const receiver = users.find((u) => u.phone === toPhone);

    if (!receiver) {
      alert("Receiver not found!");
      return;
    }

    // Update balances
    const newBalance = balance - sendAmount;
    localStorage.setItem("balance", newBalance);

    // Update receiver's balance
    const updatedUsers = users.map((u) => {
      if (u.phone === toPhone) {
        return { ...u, balance: (u.balance || 0) + sendAmount };
      }
      if (u.phone === userPhone) {
        return { ...u, balance: newBalance };
      }
      return u;
    });
    localStorage.setItem("Wire Transfer_users", JSON.stringify(updatedUsers));

    // Save transaction to history
    saveTransaction(
      userPhone,
      toPhone,
      sendAmount,
      "internal",
      "completed",
      `INT${Date.now()}`,
    );

    setSuccess(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-white">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Transfer Successful!
          </h2>
          <p className="text-gray-600">
            You sent ${amount} to {toPhone}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center">
                <Bolt className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">Wire Transfer.</span>
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-500 hover:text-blue-600"
            >
              <Home className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Send Money</h1>
              <p className="text-gray-600">
                Available balance: ${balance.toLocaleString()}
              </p>
            </div>

            <form
              onSubmit={handleSend}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Receiver's Phone Number
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={toPhone}
                    onChange={(e) => setToPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="Enter receiver's phone number"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Amount ($)
                </label>
                <div className="relative">
                  <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="Enter amount"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                Send Money <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
