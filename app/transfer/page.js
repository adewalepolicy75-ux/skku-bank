"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bolt, Home, ArrowLeft, Building, Banknote, Globe, Loader2, CheckCircle } from "lucide-react";
import BottomNav from "../../components/BottomNav";

const nigerianBanks = [
  "Access Bank", "Zenith Bank", "GTBank", "UBA", "First Bank", 
  "FCMB", "Stanbic IBTC", "Union Bank", "Sterling Bank", 
  "Wema Bank", "Fidelity Bank", "Polaris Bank", "Unity Bank",
  "Keystone Bank", "Jaiz Bank", "Suntrust Bank","Opay Bank","Palmpay Bank"
];

const usBanks = [
  "Chase Bank", "Bank of America", "Wells Fargo", "CitiBank", 
  "Capital One", "Goldman Sachs", "Morgan Stanley", "PNC Bank",
  "US Bank", "TD Bank", "Truist Bank", "HSBC USA"
];

const ukBanks = [
  "Barclays", "HSBC UK", "Lloyds Bank", "NatWest", 
  "Santander UK", "Bank of Scotland", "Royal Bank of Scotland",
  "Nationwide", "TSB Bank"
];

export default function TransferPage() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState("nigeria");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingName, setFetchingName] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) router.push("/login");
  }, [router]);

  const getBanks = () => {
    switch(selectedCountry) {
      case "nigeria": return nigerianBanks;
      case "usa": return usBanks;
      case "uk": return ukBanks;
      default: return nigerianBanks;
    }
  };

  const getCurrencySymbol = () => {
    switch(selectedCountry) {
      case "nigeria": return "₦";
      case "usa": return "$";
      case "uk": return "£";
      default: return "$";
    }
  };

  const getCurrencyCode = () => {
    switch(selectedCountry) {
      case "nigeria": return "NGN";
      case "usa": return "USD";
      case "uk": return "GBP";
      default: return "USD";
    }
  };

  const getCountryFlag = () => {
    switch(selectedCountry) {
      case "nigeria": return "🇳🇬";
      case "usa": return "🇺🇸";
      case "uk": return "🇬🇧";
      default: return "🇳🇬";
    }
  };

  useEffect(() => {
    const fetchAccountName = async () => {
      if (accountNumber.length >= 10 && selectedBank) {
        setFetchingName(true);
        setAccountName("");
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockNames = {
          nigeria: ["Adebayo Ogunlesi", "Ngozi Okonjo", "Aliko Dangote", "Femi Otedola"],
          usa: ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis"],
          uk: ["James Wilson", "Emma Thompson", "David Beckham", "Kate Winslet"]
        };
        
        const names = mockNames[selectedCountry];
        const nameIndex = parseInt(accountNumber.slice(-2)) % names.length;
        setAccountName(names[nameIndex]);
        setFetchingName(false);
      } else {
        setAccountName("");
      }
    };
    
    const timeout = setTimeout(fetchAccountName, 500);
    return () => clearTimeout(timeout);
  }, [accountNumber, selectedBank, selectedCountry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accountName) {
      alert("Please wait for account verification");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-white">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Successful!</h2>
          <p className="text-gray-600">You sent {getCurrencySymbol()}{amount} to {accountName}</p>
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
              {/* Country Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Select Country</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCountry("nigeria");
                      setAccountName("");
                      setAccountNumber("");
                      setSelectedBank("");
                    }}
                    className={`flex-1 py-2 rounded-xl font-semibold transition ${
                      selectedCountry === "nigeria" 
                        ? "bg-green-600 text-white" 
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    🇳🇬 Nigeria
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCountry("usa");
                      setAccountName("");
                      setAccountNumber("");
                      setSelectedBank("");
                    }}
                    className={`flex-1 py-2 rounded-xl font-semibold transition ${
                      selectedCountry === "usa" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    🇺🇸 USA
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCountry("uk");
                      setAccountName("");
                      setAccountNumber("");
                      setSelectedBank("");
                    }}
                    className={`flex-1 py-2 rounded-xl font-semibold transition ${
                      selectedCountry === "uk" 
                        ? "bg-red-600 text-white" 
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    🇬🇧 UK
                  </button>
                </div>
              </div>

              {/* Bank Selection */}
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
                  {getBanks().map((bank) => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>

              {/* Account Number */}
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

              {/* Account Name - Auto fetched */}
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

              {/* Amount */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Amount ({getCurrencyCode()})
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder={`Enter amount in ${getCurrencyCode()}`}
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
                  `Send ${getCurrencySymbol()}${amount || "0"}`
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
