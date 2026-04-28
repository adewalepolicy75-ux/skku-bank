"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bolt, Home, ArrowLeft, Building, Banknote, Globe, Loader2 } from "lucide-react";
import BottomNav from "../components/BottomNav";

const ukBanks = [
  "Barclays", "HSBC UK", "Lloyds Bank", "NatWest", 
  "Santander UK", "Bank of Scotland", "Royal Bank of Scotland",
  "Nationwide", "TSB Bank", "Co-operative Bank", "Metro Bank"
];

const usBanks = [
  "Chase Bank", "Bank of America", "Wells Fargo", "CitiBank", 
  "Capital One", "Goldman Sachs", "Morgan Stanley", "PNC Bank",
  "US Bank", "TD Bank", "Truist Bank", "HSBC USA"
];

export default function TransferPage() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState("uk");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingName, setFetchingName] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) router.push("/login");
  }, [router]);

  const banks = selectedCountry === "uk" ? ukBanks : usBanks;
  const currencySymbol = selectedCountry === "uk" ? "£" : "$";
  const currencyCode = selectedCountry === "uk" ? "GBP" : "USD";

  useEffect(() => {
    if (accountNumber.length >= 8 && selectedBank) {
      fetchAccountName();
    } else {
      setAccountName("");
    }
  }, [accountNumber, selectedBank]);

  const fetchAccountName = async () => {
    setFetchingName(true);
    setAccountName("");
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const names = selectedCountry === "uk" 
      ? ["James Wilson", "Sarah Johnson", "David Brown", "Emma Davis"]
      : ["John Smith", "Michael Brown", "Jessica Martinez", "Robert Jackson"];
    
    const nameIndex = parseInt(accountNumber.slice(-2)) % names.length;
    setAccountName(names[nameIndex]);
    setFetchingName(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accountName) {
      alert("Please wait for account verification");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      alert(`Transfer of ${currencySymbol}${amount} to ${accountName} at ${selectedBank} was successful!`);
      router.push("/dashboard");
      setLoading(false);
    }, 1500);
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
              <span className="font-bold text-xl text-gray-900">Wire Transfer</span>
            </Link>
            <Link href="/dashboard" className="text-gray-500 hover:text-blue-600">
              <Home className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-50 py-12 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Send to Other Bank</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6">
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Select Country</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCountry("uk");
                      setAccountName("");
                      setAccountNumber("");
                      setSelectedBank("");
                    }}
                    className={`flex-1 py-3 rounded-xl font-semibold transition ${
                      selectedCountry === "uk" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    🇬🇧 United Kingdom
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCountry("usa");
                      setAccountName("");
                      setAccountNumber("");
                      setSelectedBank("");
                    }}
                    className={`flex-1 py-3 rounded-xl font-semibold transition ${
                      selectedCountry === "usa" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    🇺🇸 USA
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Select Bank</label>
                <select
                  value={selectedBank}
                  onChange={(e) => {
                    setSelectedBank(e.target.value);
                    setAccountName("");
                  }}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Choose a bank</option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Account Number</label>
                <div className="relative">
                  <Banknote className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    maxLength="10"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="Enter account number"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Account Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={accountName}
                    readOnly
                    className={`w-full p-3 border rounded-xl bg-gray-50 ${
                      fetchingName ? "text-gray-400" : "text-gray-900"
                    }`}
                    placeholder={fetchingName ? "Fetching account name..." : "Account name will appear here"}
                  />
                  {fetchingName && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                    </div>
                  )}
                </div>
                {accountName && !fetchingName && (
                  <p className="text-xs text-green-600 mt-1">✓ Account verified</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Amount ({currencyCode})</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder={`Enter amount in ${currencyCode}`}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || fetchingName || !accountName}
                className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                  loading || fetchingName || !accountName
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Send ${currencySymbol}${amount || "0"}`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
