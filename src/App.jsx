import { useState } from 'react'
import { ArrowRight, Sparkles, GraduationCap, Compass, ChevronRight } from 'lucide-react'

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6">
        <div className="flex items-center gap-3">
          <img src="/metvero_logo.png" alt="Metvero" className="h-10 w-auto" />
          <span className="text-xl font-bold tracking-tight">Metvero</span>
        </div>
        <a
          href="mailto:hello@metvero.com"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Contact Us
        </a>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 sm:pt-24 pb-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-10 backdrop-blur-sm">
          <Sparkles size={14} className="text-indigo-400" />
          <span className="text-sm font-medium text-gray-300">Coming Soon</span>
        </div>

        {/* Logo hero */}
        <div className="mb-10">
          <img
            src="/metvero_full_logo.jpg"
            alt="Metvero"
            className="h-24 sm:h-32 w-auto rounded-2xl shadow-2xl shadow-indigo-500/10"
          />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-center tracking-tight leading-[1.1] max-w-4xl">
          The Future of
          <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Academic Intelligence
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-gray-400 text-center max-w-2xl leading-relaxed">
          A platform that understands where students want to go — and builds 
          the verified path to get them there. Every option. Every possibility. 
          In real time.
        </p>

        {/* Feature pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: GraduationCap, label: 'Dream-Driven Paths' },
            { icon: Compass, label: 'Real-Time Guidance' },
            { icon: Sparkles, label: 'Intelligent Planning' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm"
            >
              <Icon size={16} className="text-indigo-400" />
              <span className="text-sm font-medium text-gray-300">{label}</span>
            </div>
          ))}
        </div>

        {/* Email signup */}
        <div className="mt-14 w-full max-w-md">
          {submitted ? (
            <div className="text-center p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl backdrop-blur-sm">
              <p className="text-indigo-300 font-medium">You're on the list! We'll be in touch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for early access"
                required
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 backdrop-blur-sm text-sm"
              />
              <button
                type="submit"
                className="group bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-500/20"
              >
                Notify Me
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}
        </div>

        {/* Teaser cards */}
        <div className="mt-24 grid sm:grid-cols-3 gap-6 max-w-4xl w-full">
          {[
            {
              title: 'For Students',
              description: 'Tell us your dream. We\'ll show you every path to get there — with real courses, real timelines, and real outcomes.',
            },
            {
              title: 'For Advisors',
              description: 'See every student\'s full picture in one place. Spend your time on guidance, not data entry.',
            },
            {
              title: 'For Institutions',
              description: 'Unify fragmented systems into a single source of truth. Improve retention, outcomes, and student satisfaction.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-indigo-500/20 transition-all duration-300 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                {card.title}
                <ChevronRight size={16} className="text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6 sm:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Metvero. All rights reserved.</p>
          <a href="mailto:hello@metvero.com" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
            hello@metvero.com
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
