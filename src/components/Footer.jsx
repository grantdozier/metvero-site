import { Link } from 'react-router-dom'

const COLUMNS = [
  {
    heading: 'Company',
    links: [
      { label: 'Services', to: '/services' },
      { label: 'Industries', to: '/industries' },
      { label: 'Perspectives', to: '/insights' },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'Overview', to: '/products' },
      { label: 'Athena', to: '/athena' },
      { label: 'Hermes', to: '/hermes' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <img src="/metvero_logo_clean.png" alt="Metvero" className="h-7 w-auto opacity-70" />
            </Link>
            <p className="mt-5 text-[13px] text-white/35 leading-relaxed max-w-xs">
              The intelligence layer for complex institutions — built by a consulting practice
              that ships what it designs.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/30 font-medium mb-5">
                {col.heading}
              </p>
              <div className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-[13px] text-white/45 hover:text-white/80 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Contact */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/30 font-medium mb-5">
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="/#contact"
                className="text-[13px] text-white/45 hover:text-white/80 transition-colors duration-300"
              >
                Get in touch
              </a>
              <a
                href="mailto:hello@metvero.com"
                className="text-[13px] text-white/45 hover:text-white/80 transition-colors duration-300"
              >
                hello@metvero.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[12px] text-white/25">
            &copy; {new Date().getFullYear()} Metvero. All rights reserved.
          </span>
          <span className="text-[12px] text-white/25 tracking-wide">
            Strategy. Systems. Products.
          </span>
        </div>
      </div>
    </footer>
  )
}
