'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Bolt } from 'lucide-react'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-5 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-purple-700 w-8 h-8 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <Bolt className="w-5 h-5 text-white" />
            </div>
            <span className="font-poppins font-bold text-2xl tracking-tight text-gray-800">
              Wire Transfer<span className="text-purple-700">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-7">
            <Link href="/personal" className="text-gray-600 font-medium hover:text-purple-700 transition">
              Personal
            </Link>
            <Link href="/business" className="text-gray-600 font-medium hover:text-purple-700 transition">
              Business
            </Link>
            <Link href="/company" className="text-gray-600 font-medium hover:text-purple-700 transition">
              Company
            </Link>
            <Link href="/help" className="text-gray-600 font-medium hover:text-purple-700 transition">
              Help
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/login" 
              className="text-gray-700 font-semibold hover:text-purple-700 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-purple-700 text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-md btn-cta"
            >
              Join Wire Transfer
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="block md:hidden text-gray-700"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col space-y-3">
            <Link href="/personal" className="py-2 text-gray-600 hover:text-purple-700 transition">
              Personal
            </Link>
            <Link href="/business" className="py-2 text-gray-600 hover:text-purple-700 transition">
              Business
            </Link>
            <Link href="/company" className="py-2 text-gray-600 hover:text-purple-700 transition">
              Company
            </Link>
            <Link href="/help" className="py-2 text-gray-600 hover:text-purple-700 transition">
              Help
            </Link>
            <div className="pt-3 flex gap-3">
              <Link
                href="/login"
                className="flex-1 border border-gray-300 rounded-full py-2.5 text-center font-medium hover:border-purple-700 hover:text-purple-700 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="flex-1 bg-purple-700 text-white rounded-full py-2.5 text-center font-medium btn-cta"
              >
                Join Wire Transfer
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
