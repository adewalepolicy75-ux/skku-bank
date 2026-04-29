"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bolt, ArrowLeft, Send, User, Coins, ArrowRight, CheckCircle } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function SendMoneyPage() {
  const router = useRouter();
  const [toPhone, setToPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [balance, setBalance] = useState(0);
  const [success, setSuccess] = useState(false);
  const [receiverName, setReceiverName] = useState("");

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

  useEffect(() => {
    const fetchReceiver = async () => {
      if (toPhone.length >= 10 && toPhone !== userPhone) {
        try {
          const response = await fetch(`/api/user?phone=${toPhone}`);
          const data = await response.json();
          if (data.success) {
            setReceiverName(data.user.fullName);
          } else {
            setReceiverName("");
          }
        } catch (error) {
          setReceiverName("");
        }
      } else {
        setReceiverName("");
      }
    };
    
    const timeout = setTimeout(fetchReceiver, 500);
    return () => clearTimeout(timeout);
  }, [toPhone, userPhone]);

  const handleSend = async (e) => {
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
    
    setLoading(true);
    
    const response = await fetch('/api/transfer-internal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromPhone: userPhone,
        toPhone: toPhone,
        amount: sendAmount
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem("balance", data.newBalance);
      setBalance(data.newBalance);
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      alert(data.error);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-white">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Successful!</h2>
          <p className="text-gray-600">You sent ${amount} to {receiverName || toPhone}</p>
          <p className="text-sm text-gray-500 mt-4">Redirecting to dashboard...</p>
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
              <span className="font-bold text-xl text-gray-900">Wire Transfer</span>
            </Link>
            <Link href="/dashboard" className="text-gray-500 hover:text-blue-600">
              <ArrowLeft className="w-5 h-5" />
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
              <p className="text-gray-600">Available balance: ${balance.toLocaleString()}</p>
            </div>

            <form onSubmit={handleSend} className="bg-white rounded-2xl shadow-xl p-8">
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
                {receiverName && (
                  <p className="text-xs text-green-600 mt-1">✓ Sending to: {receiverName}</p>
                )}
                {toPhone && toPhone !== userPhone && !receiverName && toPhone.length >= 10 && (
                  <p className="text-xs text-red-600 mt-1">✗ User not found</p>
                )}
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
                disabled={loading || !receiverName}
                className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                  loading || !receiverName
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loading ? "Processing..." : `Send $${amount || "0"}`}
              </button>
            </form>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
