import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import FadeIn from './FadeIn'

export default function CTA() {
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
    <section id="contact" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
      {/* Griffin watermark */}
      <img
        src="/metvero_griffin_clean.png"
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] object-contain opacity-[0.03] pointer-events-none select-none"
      />

      <div className="relative max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <p className="text-[11px] tracking-[0.35em] uppercase text-white/30 font-medium mb-6">
            Get Started
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] leading-tight mb-6">
            Ready to See It
            <br />
            in Action?
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-[16px] text-white/40 leading-relaxed mb-10 max-w-md mx-auto">
            Join the waitlist and be the first to experience the future of
            institutional intelligence.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          {submitted ? (
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] px-6 py-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[14px] text-white/80">
                You're on the list. We'll be in touch.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-white/[0.05] border border-white/[0.1] px-4 py-3 text-[14px] text-white placeholder-white/25 focus:outline-none focus:border-white/[0.2] transition-colors duration-300"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 bg-white text-[#0d1117] px-6 py-3 text-[13px] font-semibold hover:bg-white/90 transition-all duration-300"
              >
                Join Waitlist
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform duration-300"
                />
              </button>
            </form>
          )}
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-8 text-[13px] text-white/25">
            Or reach out directly at{' '}
            <a
              href="mailto:hello@metvero.com"
              className="text-white/45 hover:text-white/70 transition-colors duration-300 underline underline-offset-2"
            >
              hello@metvero.com
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
