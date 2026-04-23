"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bolt,
  Eye,
  EyeOff,
  Mail,
  Phone,
  User,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, phone, password })
  });
  
  const data = await response.json();
  
 if (data.success) {
   localStorage.setItem("balance", "0"); // Zero balance
   alert(
     `Account created! Your phone number is your account: ${data.user.phone}`,
   );
   router.push("/login");
 }
};

  return (
    <>
      <nav className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-6">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center">
              <Bolt className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">skku.</span>
          </Link>
             <Link
                      href="/"
                      className="text-gray-500 hover:text-blue-600 transition ml-4"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Link>
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
