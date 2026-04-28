// "use client";
// import BottomNav from "../../../components/BottomNav";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   Bolt,
//   Copy,
//   ArrowUpRight,
//   ArrowDownLeft,
//   Eye,
//   EyeOff,
//   Send,
//   QrCode,
//   Gift,
//   ChevronRight,
//   Home,
//   CreditCard,
//   PiggyBank,
//   Wallet,
//   Menu,
//   X,
//   Plus,
// } from "lucide-react";
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
  Plus,
  ChevronRight,
  Home,
  Menu,
  X,
} from "lucide-react";
import BottomNav from "../../../components/BottomNav";

export default function DashboardPage() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);

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

      // Load real transactions
      const allTransactions = JSON.parse(
        localStorage.getItem("transactions") || "[]",
      );
      setRecentTransactions(allTransactions.slice(0, 4));
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
              <span className="font-bold text-xl text-gray-900">Wire Transfer.</span>
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
              <Link href="/save" className="text-gray-600 hover:text-blue-600">
                Save
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

      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-100 py-3 sticky top-0 z-50 md:hidden">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center">
              <Bolt className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">Wire Transfer.</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-white border-b border-gray-100 py-4 md:hidden">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <Link href="/dashboard" className="text-blue-600 py-2">
              Home
            </Link>
            <Link href="/send" className="text-gray-600 py-2">
              Send
            </Link>
            <Link href="/pay" className="text-gray-600 py-2">
              Pay
            </Link>
            <Link href="/save" className="text-gray-600 py-2">
              Save
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
      )}

      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen py-6">
        <div className="container mx-auto px-4 pb-20">
          {/* Account Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
            <div className="flex justify-between items-start">
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
                    {showBalance ? `$${balance.toLocaleString()}` : "$••••••"}
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

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <Link
              href="/transfer"
              className="bg-blue-600 text-white py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Transfer
            </Link>
            <button
              onClick={() => {
                const amount = prompt("Enter amount to add:", "1000");
                if (amount) {
                  const addAmount = parseInt(amount);
                  const currentBalance = parseFloat(
                    localStorage.getItem("balance") || "0",
                  );
                  const newBalance = currentBalance + addAmount;

                  localStorage.setItem("balance", newBalance);
                  setBalance(newBalance);

                  const transactions = JSON.parse(
                    localStorage.getItem("transactions") || "[]",
                  );
                  const newTransaction = {
                    id: Date.now(),
                    date: new Date().toISOString(),
                    fromUser: "Deposit",
                    toUser: localStorage.getItem("userPhone"),
                    amount: addAmount,
                    type: "deposit",
                    status: "completed",
                    reference: `DEP${Date.now()}`,
                  };
                  transactions.unshift(newTransaction);
                  localStorage.setItem(
                    "transactions",
                    JSON.stringify(transactions),
                  );

                  setRecentTransactions(transactions.slice(0, 4));

                  alert(`$${addAmount} added successfully!`);
                  setLastUpdated(new Date().toLocaleString());
                }
              }}
              className="bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-center hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Money
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-sm">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">
                Recent Transactions
              </h3>
              <Link
                href="/transactions"
                className="text-blue-600 text-sm flex items-center gap-1"
              >
                See all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentTransactions.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No transactions yet. Send money to see activity.
                </div>
              ) : (
                recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-4 hover:bg-gray-50 transition flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={
                          "w-10 h-10 rounded-full flex items-center justify-center " +
                          (tx.type === "deposit"
                            ? "bg-green-100"
                            : "bg-red-100")
                        }
                      >
                        {tx.type === "deposit" ? (
                          <ArrowDownLeft className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {tx.type === "deposit"
                            ? "Money Added"
                            : tx.type === "internal"
                              ? "Send to Wire Transfer User"
                              : "Bank Transfer"}
                        </p>
                        <p className="text-xs text-gray-500">{tx.toUser}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(tx.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={
                          "font-semibold " +
                          (tx.type === "deposit"
                            ? "text-green-600"
                            : "text-red-600")
                        }
                      >
                        {tx.type === "deposit" ? "+" : "-"}$
                        {tx.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-green-600">{tx.status}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
