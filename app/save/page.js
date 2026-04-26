"use client";
import BottomNav from "../../components/BottomNav";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bolt, ArrowLeft, PiggyBank, Target, Calendar } from "lucide-react";

export default function SavePage() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) router.push("/login");
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
          <div className="max-w-md mx-auto text-center">
            <PiggyBank className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Save Money
            </h1>
            <p className="text-gray-600 mb-8">Start saving for your goals</p>
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">Save ₦5,000 monthly</h3>
              <p className="text-sm text-gray-500">
                0% interest • Flexible withdrawal
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Auto-save daily</h3>
              <p className="text-sm text-gray-500">Save ₦200 every day</p>
            </div>
            <p className="text-center text-gray-500 text-sm mt-8">
              Coming soon: More saving options
            </p>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
