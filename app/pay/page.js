"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bolt,
  Home,
  Smartphone,
  Wifi,
  Tv,
  Zap,
  Sun,
  CreditCard,
  QrCode,
  Wallet,
  Gamepad2,
  Gift,
  Bus,
  GraduationCap,
  Search,
} from "lucide-react";
import BottomNav from "../../components/BottomNav";

export default function PayPage() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) router.push("/login");
  }, [router]);

  const essentials = [
    {
      name: "Airtime",
      icon: Smartphone,
      color: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      name: "Internet",
      icon: Wifi,
      color: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      name: "TV",
      icon: Tv,
      color: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      name: "Electricity",
      icon: Zap,
      color: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      name: "Solar",
      icon: Sun,
      color: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      name: "eSIM",
      icon: Smartphone,
      color: "bg-cyan-100",
      textColor: "text-cyan-600",
    },
  ];

  const cardlessPayments = [
    {
      name: "Pay with Bank",
      icon: CreditCard,
      color: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      name: "Pay with USSD",
      icon: QrCode,
      color: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      name: "POS Terminal",
      icon: Wallet,
      color: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];

  const lifestyle = [
    {
      name: "Betting",
      icon: Gamepad2,
      color: "bg-red-100",
      textColor: "text-red-600",
    },
    {
      name: "Gift Cards",
      icon: Gift,
      color: "bg-pink-100",
      textColor: "text-pink-600",
    },
    {
      name: "Transport",
      icon: Bus,
      color: "bg-teal-100",
      textColor: "text-teal-600",
    },
    {
      name: "Education",
      icon: GraduationCap,
      color: "bg-indigo-100",
      textColor: "text-indigo-600",
    },
  ];

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
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Pay</h1>
              <p className="text-gray-500 text-sm">
                Pay bills and services instantly
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for bill..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>

            {/* Essentials Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Essentials
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {essentials.map((item, idx) => (
                  <button
                    key={idx}
                    className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition"
                  >
                    <div
                      className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-2`}
                    >
                      <item.icon className={`w-6 h-6 ${item.textColor}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cardless Payments Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Cardless Payments
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {cardlessPayments.map((item, idx) => (
                  <button
                    key={idx}
                    className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition"
                  >
                    <div
                      className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-2`}
                    >
                      <item.icon className={`w-6 h-6 ${item.textColor}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lifestyle Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Lifestyle
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {lifestyle.map((item, idx) => (
                  <button
                    key={idx}
                    className="bg-white rounded-2xl p-3 text-center shadow-sm hover:shadow-md transition"
                  >
                    <div
                      className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-2`}
                    >
                      <item.icon className={`w-5 h-5 ${item.textColor}`} />
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
