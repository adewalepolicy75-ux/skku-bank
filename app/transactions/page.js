"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bolt,
  Home,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  Calendar,
  Filter,
} from "lucide-react";
import BottomNav from "../../components/BottomNav";
import { getTransactions } from "../../lib/transactions";

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all"); // all, sent, received

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      router.push("/login");
      return;
    }

    const allTransactions = getTransactions();
    setTransactions(allTransactions);
  }, [router]);

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "all") return true;
    if (filter === "sent")
      return tx.type === "internal" || tx.type === "external";
    return true;
  });

  const getIcon = (type) => {
    if (type === "internal" || type === "external") {
      return <ArrowUpRight className="w-5 h-5 text-red-600" />;
    }
    return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
  };

  const getBgColor = (type) => {
    if (type === "internal" || type === "external") {
      return "bg-red-100";
    }
    return "bg-green-100";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-NG", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

      <div className="min-h-screen bg-gray-50 py-6 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <History className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Transactions
                </h1>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setFilter("all")}
                className={`flex-1 py-2 rounded-xl font-semibold transition ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("sent")}
                className={`flex-1 py-2 rounded-xl font-semibold transition ${
                  filter === "sent"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                Sent
              </button>
            </div>

            {/* Transactions List */}
            {transactions.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center">
                <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No transactions yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Send money to see your history
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 ${getBgColor(tx.type)} rounded-full flex items-center justify-center`}
                        >
                          {getIcon(tx.type)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {tx.type === "internal"
                              ? "Send to Wire Transfer User"
                              : "Bank Transfer"}
                          </p>
                          <p className="text-xs text-gray-500">{tx.toUser}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(tx.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">
                          -${tx.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          {tx.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
