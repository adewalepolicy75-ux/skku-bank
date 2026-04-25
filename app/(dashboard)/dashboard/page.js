"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bolt,
  Copy,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Send,
  QrCode,
  Gift,
  ChevronRight,
  Home,
  CreditCard,
  PiggyBank,
  Wallet,
  Menu,
  X,
  Plus,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const savedName = localStorage.getItem("userName");
    const savedBalance = localStorage.getItem("balance");
    const savedPhone = localStorage.getItem("userPhone");

    if (!loggedIn) {
      router.push("/login");
    } else {
      setUserName(savedName || "");
      setBalance(parseFloat(savedBalance || "0"));
      setAccountNumber(savedPhone || "2022444473");
      setLastUpdated(new Date().toLocaleString());
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(accountNumber);
    alert("Account number copied!");
  };

  const transactions = [
    {
      name: "Abdulkabir Pelumi Ajiboye",
      date: "Apr 5, 2026",
      time: "7:18 AM",
      amount: 100.0,
      type: "credit",
    },
    {
      name: "Bilal Olamiposi Bello",
      date: "Apr 2, 2026",
      time: "2:27 PM",
      amount: 100.0,
      type: "credit",
    },
    {
      name: "John Adeyemi",
      date: "Mar 30, 2026",
      time: "10:15 AM",
      amount: 25000.0,
      type: "debit",
    },
    {
      name: "Sarah Okafor",
      date: "Mar 28, 2026",
      time: "3:45 PM",
      amount: 5000.0,
      type: "credit",
    },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white border-b border-gray-100 py-3 sticky top-0 z-50 hidden md:block">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center">
                <Bolt className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">SKKU</span>
            </div>
            <div className="flex gap-8">
              <Link href="/dashboard" className="text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/send" className="text-gray-600 hover:text-blue-600">
                Send
              </Link>
              <Link href="/pay" className="text-gray-600 hover:text-blue-600">
                Pay
              </Link>
              <Link
                href="/budget"
                className="text-gray-600 hover:text-blue-600"
              >
                Budget
              </Link>
              <Link href="/card" className="text-gray-600 hover:text-blue-600">
                Card
              </Link>
              <Link
                href="/account"
                className="text-gray-600 hover:text-blue-600"
              >
                Account
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Header with Hamburger */}
      <div className="bg-white border-b border-gray-100 py-3 sticky top-0 z-50 md:hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center">
                <Bolt className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">k.</span>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-white border-b border-gray-100 py-4 md:hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/dashboard"
                className="text-blue-600 font-medium py-2"
              >
                Home
              </Link>
              <Link href="/send" className="text-gray-600 py-2">
                Send
              </Link>
              <Link href="/pay" className="text-gray-600 py-2">
                Pay
              </Link>
              <Link href="/budget" className="text-gray-600 py-2">
                Budget
              </Link>
              <Link href="/card" className="text-gray-600 py-2">
                Card
              </Link>
              <Link href="/account" className="text-gray-600 py-2">
                Account
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 text-left py-2"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 min-h-screen py-6">
        <div className="container mx-auto px-4">
          {/* Account Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">
                    Naira Account - {accountNumber}
                  </span>
                  <button
                    onClick={copyAccountNumber}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <h2 className="text-3xl font-bold">
                    {showBalance ? `₦${balance.toLocaleString()}` : "₦••••••"}
                  </h2>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-gray-400"
                  >
                    {showBalance ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  Last updated {lastUpdated}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons - Transfer and Add Money */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <Link
              href="/transfer"
              className="bg-blue-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Transfer
            </Link>
            <button className="bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-center hover:bg-gray-200 transition flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add Money
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-sm">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">
                Recent Transactions
              </h3>
              <button className="text-blue-600 text-sm flex items-center gap-1">
                See all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {transactions.map((tx, idx) => (
                <div
                  key={idx}
                  className="p-4 hover:bg-gray-50 transition flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "credit" ? "bg-green-100" : "bg-red-100"}`}
                    >
                      {tx.type === "credit" ? (
                        <ArrowDownLeft className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tx.name}</p>
                      <p className="text-xs text-gray-400">
                        {tx.date} • {tx.time}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-semibold ${tx.type === "credit" ? "text-green-600" : "text-red-600"}`}
                  >
                    {tx.type === "credit" ? "+" : "-"}₦
                    {tx.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation Bar (Mobile) */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2 md:hidden">
            <div className="flex justify-around items-center">
              <Link
                href="/dashboard"
                className="flex flex-col items-center py-1 text-blue-600"
              >
                <Home className="w-5 h-5" />
                <span className="text-xs mt-1">Home</span>
              </Link>
              <Link
                href="/send"
                className="flex flex-col items-center py-1 text-gray-500"
              >
                <Send className="w-5 h-5" />
                <span className="text-xs mt-1">Send</span>
              </Link>
              <button className="flex flex-col items-center py-1 text-gray-500">
                <CreditCard className="w-5 h-5" />
                <span className="text-xs mt-1">Pay</span>
              </button>
              <button className="flex flex-col items-center py-1 text-gray-500">
                <PiggyBank className="w-5 h-5" />
                <span className="text-xs mt-1">Save</span>
              </button>
              <button className="flex flex-col items-center py-1 text-gray-500">
                <Wallet className="w-5 h-5" />
                <span className="text-xs mt-1">Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add padding at bottom for mobile */}
      <div className="h-16 md:hidden"></div>
    </>
  );
}
