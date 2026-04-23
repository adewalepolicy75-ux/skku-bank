"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 w-8 h-8 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl text-white">skku.</span>
            </div>
            <p className="text-sm">The money app for Africans</p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-blue-400 transition"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-blue-400 transition">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/personal"
                  className="hover:text-blue-400 transition"
                >
                  Personal
                </Link>
              </li>
              <li>
                <Link
                  href="/business"
                  className="hover:text-blue-400 transition"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link href="/invest" className="hover:text-blue-400 transition">
                  Invest
                </Link>
              </li>
              <li>
                <Link href="/cards" className="hover:text-blue-400 transition">
                  Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-blue-400 transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-blue-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-sm">
            © 2024 SKKU Microfinance Bank. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
