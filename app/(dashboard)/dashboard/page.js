"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bolt,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  Receipt,
  User,
  Bell,
  Settings,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const balance = 245500;
  const accountNumber = "0123456789";

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (!userLoggedIn) {
      router.push("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const transactions = [
    {
      id: 1,
      type: "sent",
      name: "John Adeyemi",
      amount: 25000,
      date: "Today",
      time: "10:30 AM",
      status: "completed",
    },
    {
      id: 2,
      type: "received",
      name: "Sarah Okafor",
      amount: 50000,
      date: "Yesterday",
      time: "2:15 PM",
      status: "completed",
    },
    {
      id: 3,
      type: "sent",
      name: "Michael Bello",
      amount: 12500,
      date: "Yesterday",
      time: "9:00 AM",
      status: "completed",
    },
    {
      id: 4,
      type: "received",
      name: "Chioma Nwachukwu",
      amount: 35000,
      date: "Apr 20",
      time: "4:45 PM",
      status: "completed",
    },
    {
      id: 5,
      type: "sent",
      name: "Emeka Okafor",
      amount: 8000,
      date: "Apr 19",
      time: "11:20 AM",
      status: "pending",
    },
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center">
                <Bolt className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">skku.</span>
            </Link>
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" />
              <User className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" />
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white mb-6 shadow-lg">
                <p className="text-blue-100 text-sm mb-2">Total Balance</p>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold">
                    {showBalance ? `₦${balance.toLocaleString()}` : "₦••••••"}
                  </h2>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-blue-200 hover:text-white"
                  >
                    {showBalance ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-blue-100 text-sm">
                  Account: {accountNumber}
                </p>
                <div className="mt-4 pt-4 border-t border-blue-500">
                  <p className="text-sm">Available Balance</p>
                  <p className="text-xl font-semibold">
                    {showBalance ? `₦${balance.toLocaleString()}` : "₦••••••"}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/transfer"
                    className="bg-blue-50 text-blue-600 p-3 rounded-xl text-center hover:bg-blue-100 transition"
                  >
                    <Send className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">Send</span>
                  </Link>
                  <button className="bg-green-50 text-green-600 p-3 rounded-xl text-center hover:bg-green-100 transition">
                    <Receipt className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">Request</span>
                  </button>
                  <button className="bg-purple-50 text-purple-600 p-3 rounded-xl text-center hover:bg-purple-100 transition">
                    <Wallet className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">Deposit</span>
                  </button>
                  <button className="bg-gray-50 text-gray-600 p-3 rounded-xl text-center hover:bg-gray-100 transition">
                    <Settings className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm">Settings</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">
                      Recent Transactions
                    </h3>
                    <Link
                      href="/transactions"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-4 hover:bg-gray-50 transition flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "sent" ? "bg-red-100" : "bg-green-100"}`}
                        >
                          {tx.type === "sent" ? (
                            <ArrowUpRight className="w-5 h-5 text-red-600" />
                          ) : (
                            <ArrowDownLeft className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {tx.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {tx.date} • {tx.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${tx.type === "sent" ? "text-red-600" : "text-green-600"}`}
                        >
                          {tx.type === "sent" ? "-" : "+"}₦
                          {tx.amount.toLocaleString()}
                        </p>
                        <p
                          className={`text-xs ${tx.status === "completed" ? "text-green-600" : "text-yellow-600"}`}
                        >
                          {tx.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
