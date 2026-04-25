"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bolt,
  Eye,
  EyeOff,
  Mail,
  Phone,
  User,
  Lock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("skku_users") || "[]");
    const userExists = users.find(
      (u) => u.email === email || u.phone === phone,
    );

    if (userExists) {
      alert("User already exists!");
      return;
    }

    const newUser = {
      fullName,
      email,
      phone,
      password,
      balance: 0,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("skku_users", JSON.stringify(users));

    // Auto login
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", fullName);
    localStorage.setItem("userPhone", phone);
    localStorage.setItem("balance", "0");

    router.push("/dashboard");
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-gray-500 hover:text-blue-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center">
                <Bolt className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">skku.</span>
            </Link>
          </div>
        </div>
      </nav>

      <section className="min-h-[80vh] flex items-center py-12 bg-gradient-to-br from-blue-50 via-white to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create an account
              </h1>
              <p className="text-gray-600">
                Join SKKU and start your banking journey
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="0801 234 5678"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                Create Account <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-gray-600 mt-6">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
