import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/services', label: 'SERVICES', match: ['/services'] },
  { to: '/industries', label: 'INDUSTRIES', match: ['/industries'] },
  { to: '/products', label: 'PRODUCTS', match: ['/products', '/athena', '/hermes'] },
  { to: '/insights', label: 'INSIGHTS', match: ['/insights'] },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const isHome = location.pathname === '/'
  const isActive = (link) => link.match.includes(location.pathname)

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-16 lg:h-20">
        <Link to="/" className="flex items-center">
          <img
            src="/metvero_logo_clean.png"
            alt="Metvero"
            className="h-6 lg:h-7 w-auto opacity-[0.85]"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[13px] transition-all duration-300 px-3 py-1.5 ${
                isActive(link)
                  ? 'text-white/90 bg-white/[0.08]'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={isHome ? '#contact' : '/#contact'}
            className="ml-2 text-[13px] text-white/90 bg-white/[0.08] hover:bg-white/[0.14] px-4 py-2 transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-9 h-9 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-white/[0.06]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-[14px] py-3 transition-colors duration-300 ${
                    isActive(link) ? 'text-white/90' : 'text-white/55 hover:text-white/85'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={isHome ? '#contact' : '/#contact'}
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-[14px] text-white/90 bg-white/[0.08] hover:bg-white/[0.14] px-4 py-3 text-center transition-colors duration-300"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
