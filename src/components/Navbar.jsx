import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Metvero</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">How It Works</a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Sign In</a>
            <a href="#" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
              Get Started Free
            </a>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pb-4">
          <div className="flex flex-col gap-3">
            <a href="#features" className="text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>How It Works</a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>Pricing</a>
            <hr className="border-gray-100" />
            <a href="#" className="text-sm font-medium text-gray-600 py-2">Sign In</a>
            <a href="#" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium text-center">
              Get Started Free
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
