"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bolt, Home, ArrowLeft, Building, Banknote, Globe } from "lucide-react";
import BottomNav from "../../components/BottomNav";

// Nigerian Banks
const nigerianBanks = [
  "Access Bank",
  "Zenith Bank",
  "GTBank",
  "UBA",
  "First Bank",
  "FCMB",
  "Stanbic IBTC",
  "Union Bank",
  "Sterling Bank",
  "Wema Bank",
  "Fidelity Bank",
  "Polaris Bank",
  "Unity Bank",
  "Keystone Bank",
  "Jaiz Bank",
  "Suntrust Bank",
  "Titan Bank",
  "Providus Bank",
  "Globus Bank",
  "VFD Bank",
  "Lotus Bank",
];

// US Banks
const usBanks = [
  "Chase Bank",
  "Bank of America",
  "Wells Fargo",
  "CitiBank",
  "Capital One",
  "Goldman Sachs",
  "Morgan Stanley",
  "PNC Bank",
  "US Bank",
  "TD Bank",
  "Truist Bank",
  "HSBC USA",
];

export default function ExternalTransferPage() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState("nigeria");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) router.push("/login");
  }, [router]);

  const banks = selectedCountry === "nigeria" ? nigerianBanks : usBanks;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate transfer
    setTimeout(() => {
      alert(
        `Transfer of ₦${amount} to ${selectedBank} account ${accountNumber} initiated successfully!`,
      );
      router.push("/dashboard");
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/transfer" className="flex items-center gap-2">
              <div className="bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center">
                <Bolt className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">skku.</span>
            </Link>
            <Link
              href="/transfer"
              className="text-gray-500 hover:text-blue-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-50 py-12 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Send to Other Bank
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              {/* Country Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Country
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCountry("nigeria")}
                    className={`flex-1 py-3 rounded-xl font-semibold transition ${
                      selectedCountry === "nigeria"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    🇳🇬 Nigeria
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCountry("usa")}
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

              {/* Bank Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Bank
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Choose a bank</option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account Number */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Account Number
                </label>
                <div className="relative">
                  <Banknote className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="Enter account number"
                    required
                  />
                </div>
              </div>

              {/* Account Name (fetched automatically) */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Account Name
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
                  placeholder="Account name will appear here"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Account name will be fetched automatically
                </p>
              </div>

              {/* Amount */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Amount (₦)
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                {loading ? "Processing..." : "Send Money"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
