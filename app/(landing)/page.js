"use client";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Bolt,
  Shield,
  Coins,
  Apple,
  Play,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

      
export default function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center">
                <Bolt className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">skku.</span>
            </div>
            <div className="hidden md:flex gap-8 text-gray-600">
              <a href="#" className="hover:text-blue-600">
                Personal
              </a>
              <a href="#" className="hover:text-blue-600">
                Business
              </a>
              <a href="#" className="hover:text-blue-600">
                Company
              </a>
              <a href="#" className="hover:text-blue-600">
                Help
              </a>
            </div>
            <div className="flex gap-3">
              <Link
                href="/login"
                className="text-gray-700 font-semibold hover:text-blue-600"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700"
              >
                Join SKKU
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-white">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-blue-100 inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6">
              <Bolt className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 text-sm font-semibold">
                SKKU Microfinance Bank
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Get more with <span className="text-blue-600">SKKU</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Earn 50 SKKU Coins on your Tier 3 SKKU account to unlock cashback,
              discounts, budgeting, and more Premium rewards.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg"
              >
                <Apple className="w-5 h-5" /> Download on the App Store
              </Link>
              <Link
                href="/signup"
                className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-800 transition shadow-lg"
              >
                <Play className="w-5 h-5" /> Google Play
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">Fully Licensed by the CBN</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">Deposits Insured by NDIC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-2xl hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Transfers</h3>
              <p className="text-gray-600">
                Send money to any bank in Nigeria for free.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Bank-Grade Security</h3>
              <p className="text-gray-600">
                Your money is safe with 2-factor authentication.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rewards Program</h3>
              <p className="text-gray-600">
                Earn SKKU Coins on every transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 mx-6 rounded-3xl mb-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-blue-100 mb-6">
            Join over 2 million Africans using SKKU
          </p>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold inline-flex items-center gap-2 hover:shadow-lg transition"
          >
            Create free account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}