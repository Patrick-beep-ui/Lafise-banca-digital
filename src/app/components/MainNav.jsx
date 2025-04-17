"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, LayoutDashboard, RefreshCcw } from "lucide-react"

const links = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Transferencias",
    href: "/transferencias",
    icon: RefreshCcw,
  },
  {
    name: "Transacciones",
    href: "/transacciones",
    icon: CreditCard,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="w-full flex items-center justify-between gap-6 md:gap-10 py-4 px-6 bg-white shadow-md">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block text-lg text-gray-800">Banco Digital</span>
      </Link>
      <nav className="flex gap-6">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-[var(--greenColor)] ${
                isActive ? "text-[var(--greenColor)]" : "text-gray-500"
              }`}
            >
              <Icon
                className={`h-4 w-4 transition-all ${
                  isActive ? "text-[var(--greenColor)] scale-110" : "text-gray-500"
                }`}
                style={{ transition: 'all 0.3s ease-in-out',
                    strokeWidth: isActive ? 2 : 1
                 }} 
              />
              {link.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
