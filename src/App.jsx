import { useState } from 'react'
import { ArrowRight, GraduationCap, Activity, BookOpen, Users, BarChart3, Zap, Target, Database } from 'lucide-react'

const products = [
  {
    id: 'athena',
    name: 'Athena',
    tagline: 'Academic Intelligence',
    accent: '#f97066',
    accentDark: '#dc4a40',
    accentLight: '#fef2f2',
    gradient: 'from-[#f97066] to-[#fb923c]',
    icon: GraduationCap,
    description: 'The unified academic platform that maps every student\'s past, present, and every possible future.',
    features: [
      { icon: BookOpen, title: 'Dream-Driven Paths', desc: 'Students say where they want to go. We compute every verified path to get there.' },
      { icon: Users, title: 'Advisor Superpowers', desc: 'Every student\'s full picture in one place. Guidance over data entry.' },
      { icon: BarChart3, title: 'Institutional Intelligence', desc: 'Unify fragmented systems. Improve retention and outcomes at scale.' },
    ],
  },
  {
    id: 'hermes',
    name: 'Hermes',
    tagline: 'Athletic & Sports Intelligence',
    accent: '#3b82f6',
    accentDark: '#2563eb',
    accentLight: '#eff6ff',
    gradient: 'from-[#3b82f6] to-[#06b6d4]',
    icon: Activity,
    description: 'Big data meets athletics. Real-time performance intelligence that gives programs a competitive edge.',
    features: [
      { icon: Zap, title: 'Performance Analytics', desc: 'Body comp, training load, strength metrics, and readiness — one view.' },
      { icon: Target, title: 'Compliance & Eligibility', desc: 'APR, CARA hours, eligibility matrices — fully automated.' },
      { icon: Database, title: 'Recruiting & Operations', desc: 'Pipeline analytics, combine benchmarks, and game week ops.' },
    ],
  },
]

function ProductCard({ product, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-500 ease-out"
      style={{
        backgroundColor: isActive ? 'white' : product.accentLight,
        borderColor: isActive ? `${product.accent}20` : `${product.accent}15`,
        boxShadow: isActive ? `0 25px 50px -12px ${product.accent}20` : `0 4px 20px -4px ${product.accent}10`,
        transform: isActive ? 'rotate(-1deg) scale(1.02)' : 'rotate(2deg) scale(0.95) translateY(8px)',
        zIndex: isActive ? 10 : 5,
        opacity: isActive ? 1 : 0.85,
      }}
    >
      {/* Accent top bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(to right, ${product.accent}, ${product.id === 'athena' ? '#fb923c' : '#06b6d4'})` }}
      />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: product.accentLight }}
          >
            <product.icon size={22} style={{ color: product.accent }} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-800">{product.name}</h2>
            <p className="text-[11px] text-stone-400 tracking-wide uppercase">{product.tagline}</p>
          </div>
        </div>

        {isActive && (
          <>
            <p className="text-sm text-stone-500 mb-4 leading-relaxed">{product.description}</p>
            <div className="space-y-3">
              {product.features.map((f) => (
                <div key={f.title} className="flex gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: product.accentLight }}
                  >
                    <f.icon size={14} style={{ color: product.accent }} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-stone-700">{f.title}</h3>
                    <p className="text-[11px] text-stone-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!isActive && (
          <p className="text-xs text-stone-400 mt-1">Click to explore →</p>
        )}
      </div>
    </div>
  )
}

function App() {
  const [activeId, setActiveId] = useState('athena')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  const active = products.find((p) => p.id === activeId)

  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col relative overflow-hidden">
      {/* Background accents */}
      <div
        className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeId === 'athena' ? 'rgba(249,112,102,0.07)' : 'rgba(59,130,246,0.07)' }}
      />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-4">
        <img
          src="/metvero_header_trimmed.png"
          alt="Metvero"
          className="h-10 sm:h-12 w-auto"
        />
        <div className="flex items-center gap-4">
          <span className="text-[10px] sm:text-xs text-stone-400 tracking-[0.2em] uppercase font-medium">
            Coming Soon
          </span>
          <a
            href="mailto:hello@metvero.com"
            className="text-xs text-stone-400 hover:text-stone-600 transition-colors hidden sm:block"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 pt-8 sm:pt-12 pb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center tracking-tight leading-tight max-w-2xl">
          <span className="text-stone-800">The Future of</span>
          <br />
          <span className={`bg-gradient-to-r ${active.gradient} bg-clip-text text-transparent`}>
            {active.tagline}
          </span>
          <br />
          <span className="text-stone-800">is Here</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-stone-500 text-center max-w-md leading-relaxed">
          Two products. One platform. Metvero is building the intelligence layer for higher education.
        </p>

        {/* Product cards — side by side with overlap */}
        <div className="mt-10 w-full max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-[-16px] relative">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isActive={activeId === product.id}
                onClick={() => setActiveId(product.id)}
              />
            ))}
          </div>
        </div>

        {/* Email signup */}
        <div className="mt-10 w-full max-w-sm">
          {submitted ? (
            <div
              className="text-center py-3 px-4 rounded-lg border"
              style={{ backgroundColor: active.accentLight, borderColor: `${active.accent}30` }}
            >
              <p className="text-sm font-medium" style={{ color: active.accent }}>You're on the list.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-white border border-stone-200 rounded-lg px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-300 text-sm"
              />
              <button
                type="submit"
                className="group text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-1.5 hover:opacity-90"
                style={{ backgroundColor: active.accent }}
              >
                Notify Me
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-5 px-6 text-center">
        <p className="text-[11px] text-stone-400">
          &copy; {new Date().getFullYear()} Metvero &nbsp;·&nbsp;{' '}
          <a href="mailto:hello@metvero.com" className="hover:text-stone-600 transition-colors">
            hello@metvero.com
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
