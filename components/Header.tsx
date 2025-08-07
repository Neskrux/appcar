'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Car, Menu, X, FileText, Search, TrendingUp, Home } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const navigation = [
    { name: 'Início', href: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Nova Avaliação', href: '/nova-avaliacao', icon: <FileText className="h-4 w-4" /> },
    { name: 'Avaliações', href: '/avaliacoes', icon: <Search className="h-4 w-4" /> },
    { name: 'Relatórios', href: '/relatorios', icon: <TrendingUp className="h-4 w-4" /> },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Car className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                THE CAR
              </span>
              <p className="text-xs text-gray-500 font-medium">Sistema de Avaliação</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group"
                >
                  <div className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200
                    ${isActive 
                      ? 'text-white' 
                      : 'text-gray-700 hover:text-purple-600'
                    }
                  `}>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      {item.icon}
                      {item.name}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Link 
              href="/nova-avaliacao"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Iniciar Avaliação
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                        ${isActive 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  )
                })}
                <Link 
                  href="/nova-avaliacao"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg"
                >
                  Iniciar Avaliação
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}