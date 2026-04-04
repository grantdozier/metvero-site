import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link to="/">
            <img
              src="/metvero_logo_clean.png"
              alt="Metvero"
              className="h-6 w-auto opacity-50"
            />
          </Link>
          <span className="text-[12px] text-white/25">
            &copy; {new Date().getFullYear()} Metvero
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/athena"
            className="text-[12px] text-white/25 hover:text-white/50 transition-colors duration-300"
          >
            ATHENA
          </Link>
          <Link
            to="/hermes"
            className="text-[12px] text-white/25 hover:text-white/50 transition-colors duration-300"
          >
            HERMES
          </Link>
          <a
            href="mailto:hello@metvero.com"
            className="text-[12px] text-white/25 hover:text-white/50 transition-colors duration-300"
          >
            hello@metvero.com
          </a>
        </div>
      </div>
    </footer>
  )
}
