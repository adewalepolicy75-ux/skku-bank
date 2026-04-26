"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Send, CreditCard, PiggyBank, Wallet } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/send", icon: Send, label: "Send" },
    { href: "/pay", icon: CreditCard, label: "Pay" },
    { href: "/save", icon: PiggyBank, label: "Save" },
    { href: "/account", icon: Wallet, label: "Account" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2 md:hidden z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 ${isActive ? "text-blue-600" : "text-gray-500"}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
       
      
  );
}
