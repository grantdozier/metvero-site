import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = location.pathname === '/'

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
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

        <div className="flex items-center gap-6 lg:gap-8">
          <Link
            to="/athena"
            className={`text-[13px] transition-all duration-300 hidden sm:block px-3 py-1.5 ${
              location.pathname === '/athena'
                ? 'text-[#D6A86E] bg-[#D6A86E]/10'
                : 'text-[#D6A86E]/70 hover:text-[#D6A86E] hover:bg-[#D6A86E]/[0.06]'
            }`}
          >
            ATHENA
          </Link>
          <Link
            to="/hermes"
            className={`text-[13px] transition-all duration-300 hidden sm:block px-3 py-1.5 ${
              location.pathname === '/hermes'
                ? 'text-[#5BC0EB] bg-[#5BC0EB]/10'
                : 'text-[#5BC0EB]/70 hover:text-[#5BC0EB] hover:bg-[#5BC0EB]/[0.06]'
            }`}
          >
            HERMES
          </Link>
          <a
            href={isHome ? '#contact' : '/#contact'}
            className="text-[13px] text-white/90 bg-white/[0.08] hover:bg-white/[0.14] px-4 py-2 transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
