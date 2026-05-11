"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bolt,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Shield,
} from "lucide-react";
import TwoFactorVerify from "../../../components/TwoFactorVerify";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      setUserData(data.user);
      setShow2FA(true);
    } else {
      alert(data.error);
    }
  };

  const handleVerified = (verified) => {
    if (verified && userData) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", userData.email);
      localStorage.setItem("userName", userData.fullName);
      localStorage.setItem("userPhone", userData.phone);
      localStorage.setItem("balance", userData.balance || "0");
      router.push("/dashboard");
    }
  };

  if (show2FA) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-white py-12">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-orange-500 p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-6 h-6 text-white" />
                <span className="text-white font-semibold">
                  Two-Factor Authentication
                </span>
              </div>
            </div>
            <TwoFactorVerify
              onVerified={handleVerified}
              onBack={() => setShow2FA(false)}
              email={userData?.email}
              phone={userData?.phone}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center">
                <Bolt className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">
                Wire Transfer
              </span>
            </Link>
            <Link href="/" className="text-gray-500 hover:text-blue-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="min-h-screen flex items-center py-12 bg-gradient-to-br from-blue-50 via-white to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h1>
             
              <p className="text-gray-600 mt-2">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
