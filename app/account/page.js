"use client";
import BottomNav from "../../components/BottomNav";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bolt,
  Home,
  User,
  Mail,
  Phone,
  Shield,
  LogOut,
} from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    balance: 0,
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const fullName = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    const phone = localStorage.getItem("userPhone");
    const balance = localStorage.getItem("balance");

    if (!loggedIn) router.push("/login");
    else
      setUser({
        fullName: fullName || "",
        email: email || "",
        phone: phone || "",
        balance: parseFloat(balance || "0"),
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
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
              <span className="font-bold text-xl text-gray-900">skku.</span>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Account Settings
            </h1>
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold">{user.fullName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p>{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Balance</p>
                  <p className="font-semibold text-blue-600">
                    ₦{user.balance.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>
        </div>
      </div>
      <BottomNav/>
    </>
  );
}
