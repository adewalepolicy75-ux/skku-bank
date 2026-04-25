"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bolt,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building,
  QrCode,
} from "lucide-react";

export default function PayPage() {
  const router = useRouter();
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const phone = localStorage.getItem("userPhone");
    if (!loggedIn) router.push("/login");
    else setUserPhone(phone || "");
  }, [router]);

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
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Pay Bills</h1>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition">
                <Smartphone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-gray-700 font-medium">Airtime</span>
              </button>
              <button className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition">
                <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-gray-700 font-medium">Electricity</span>
              </button>
              <button className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition">
                <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-gray-700 font-medium">
                  TV Subscription
                </span>
              </button>
              <button className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition">
                <QrCode className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-gray-700 font-medium">Scan & Pay</span>
              </button>
            </div>
            <p className="text-center text-gray-500 text-sm mt-8">
              Coming soon: More payment options
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
