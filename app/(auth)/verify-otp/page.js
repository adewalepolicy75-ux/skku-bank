"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bolt, Smartphone, ArrowLeft } from "lucide-react";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState("0");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedOtp = localStorage.getItem("pendingOTP");
    const userEmail = localStorage.getItem("tempUserEmail");
    const userPhone = localStorage.getItem("tempUserPhone");
    const userNameStored = localStorage.getItem("tempUserName");
    const userBalance = localStorage.getItem("tempUserBalance");

    if (!savedOtp || !userEmail) {
      router.push("/login");
    } else {
      setEmail(userEmail);
      setPhone(userPhone || "");
      setUserName(userNameStored || "");
      setBalance(userBalance || "0");
    }
  }, [router]);

  const handleVerify = (e) => {
    e.preventDefault();

    const savedOtp = localStorage.getItem("pendingOTP");

    if (savedOtp === code) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPhone", phone);
      localStorage.setItem("userName", userName);
      localStorage.setItem("balance", balance);

      localStorage.removeItem("pendingOTP");
      localStorage.removeItem("tempUserEmail");
      localStorage.removeItem("tempUserPhone");
      localStorage.removeItem("tempUserName");
      localStorage.removeItem("tempUserBalance");

      router.push("/dashboard");
    } else {
      setError("Invalid verification code. Please try again.");
    }
  };

 const resendCode = async () => {
   const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
   localStorage.setItem("pendingOTP", newOtp);

   const response = await fetch("/api/send-email", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ email, otp: newOtp }),
   });

   if (response.ok) {
     alert("New code sent! Check your console/terminal.");
   } else {
     alert("Failed to send code. Check your console.");
   }
 };

  return (
    <>
      <nav className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-6 flex items-center gap-4">
          <Link href="/login" className="text-gray-500 hover:text-blue-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center">
              <Bolt className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">skku.</span>
          </div>
        </div>
      </nav>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-white py-12">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Verify with Code
              </h1>
              <p className="text-gray-600 mt-2">
                We sent a 6-digit code to {email}
              </p>
            </div>

            <form onSubmit={handleVerify}>
              <input
                type="text"
                maxLength="6"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full text-center text-2xl tracking-wider py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 mb-4"
                placeholder="000000"
                autoFocus
              />

              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Verify & Sign In
              </button>

              <button
                type="button"
                onClick={resendCode}
                className="w-full text-blue-600 text-sm mt-4 hover:underline"
              >
                Resend code
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
