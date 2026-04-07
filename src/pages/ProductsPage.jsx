import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import CTA from '../components/CTA'

const ease = [0.22, 1, 0.36, 1]

export default function ProductsPage() {
  return (
    <>
      {/* === HERO === */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0d1117]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <span className="inline-block text-[11px] tracking-[0.35em] uppercase text-white/40 font-medium">
              Products
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease }}
            className="mt-8 text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.02em] leading-[1.1]"
          >
            What We've Built.
            <br />
            <span className="text-white/40">What's Coming.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.5, ease }}
            className="mt-8 text-[17px] leading-relaxed text-white/50 max-w-xl mx-auto"
          >
            Every platform started as a consulting engagement — a real problem
            no existing tool could solve. So we built the answer.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/25">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} className="text-white/25" />
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* CHAPTER 000 — THE PRACTICE                                      */}
      {/* ================================================================ */}
      <section className="relative py-24 lg:py-32 overflow-hidden border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="w-8 h-px bg-white/10" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-medium">
                000
              </span>
              <div className="w-8 h-px bg-white/10" />
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.02em] leading-[1.1] mb-6">
              Custom Engagements
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-[16px] text-white/40 leading-relaxed max-w-lg mx-auto mb-10">
              Every product below was born from a consulting engagement — a real
              problem we were hired to solve. The practice is the engine.
              The platforms are what it produces.
            </p>
          </FadeIn>

          <FadeIn delay={0.22}>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-white/50 hover:text-white/80 transition-colors duration-300"
            >
              Learn about our practice
              <ArrowRight
                size={13}
                className="group-hover:translate-x-0.5 transition-transform duration-300"
              />
            </Link>
          </FadeIn>
        </div>
      </section>

      <div className="border-t border-white/[0.06]" />

      {/* ================================================================ */}
      {/* CHAPTER 1 — ATHENA                                              */}
      {/* ================================================================ */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        {/* Accent glow */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.04] pointer-events-none"
          style={{ backgroundColor: '#D6A86E', top: '10%', right: '-5%' }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Chapter marker */}
          <FadeIn>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-8 h-px bg-[#D6A86E]/30" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D6A86E]/50 font-medium">
                001
              </span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <FadeIn>
                <h2
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.9] mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #D6A86E, #E8C590)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Athena
                </h2>
              </FadeIn>
              <FadeIn delay={0.08}>
                <p className="text-[12px] tracking-[0.2em] uppercase text-[#D6A86E]/60 font-medium mb-8">
                  Academic Operations
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="text-[16px] text-white/50 leading-relaxed mb-8 max-w-lg">
                  The unified academic platform that brings every student's
                  journey into a single, clear view — from where they've been
                  to where they're going.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Link
                  to="/athena"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-300"
                  style={{ color: '#D6A86E' }}
                >
                  Explore Athena
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-0.5 transition-transform duration-300"
                  />
                </Link>
              </FadeIn>
            </div>

            {/* Image */}
            <FadeIn direction="right" delay={0.2} duration={0.9}>
              <div className="relative aspect-[4/3] w-full">
                <div
                  className="absolute -inset-4 rounded-3xl blur-[80px] opacity-[0.12]"
                  style={{ backgroundColor: '#D6A86E' }}
                />
                <div className="relative h-full rounded-xl overflow-hidden border border-white/[0.08]">
                  <img
                    src="/college_students_learning_BEST_ONE.png"
                    alt="Students collaborating with technology"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/20 via-transparent to-[#0d1117]/20" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Cinematic divider */}
      <div className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
        <img
          src="/LSU_Stadium.webp"
          alt="Aerial view of athletic campus facilities at night"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0d1117]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117]" />
      </div>

      {/* ================================================================ */}
      {/* CHAPTER 2 — HERMES                                              */}
      {/* ================================================================ */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.04] pointer-events-none"
          style={{ backgroundColor: '#5BC0EB', top: '10%', left: '-5%' }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-8 h-px bg-[#5BC0EB]/30" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#5BC0EB]/50 font-medium">
                002
              </span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image — left on desktop */}
            <FadeIn direction="left" delay={0.2} duration={0.9}>
              <div className="relative aspect-[4/3] w-full lg:order-1">
                <div
                  className="absolute -inset-4 rounded-3xl blur-[80px] opacity-[0.12]"
                  style={{ backgroundColor: '#5BC0EB' }}
                />
                <div className="relative h-full rounded-xl overflow-hidden border border-white/[0.08]">
                  <img
                    src="/college_athletics_treadmill_USE_THIS_ONE.png"
                    alt="Athletic performance monitoring"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/20 via-transparent to-[#0d1117]/20" />
                </div>
              </div>
            </FadeIn>

            {/* Text — right on desktop */}
            <div className="lg:order-2">
              <FadeIn>
                <h2
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.9] mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #5BC0EB, #6FD3FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Hermes
                </h2>
              </FadeIn>
              <FadeIn delay={0.08}>
                <p className="text-[12px] tracking-[0.2em] uppercase text-[#5BC0EB]/60 font-medium mb-8">
                  Athletic Operations
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="text-[16px] text-white/50 leading-relaxed mb-8 max-w-lg">
                  Athletics operations, unified. Performance visibility,
                  automated compliance, and recruiting intelligence — giving
                  programs a competitive edge from the training room to the
                  front office.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Link
                  to="/hermes"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-300"
                  style={{ color: '#5BC0EB' }}
                >
                  Explore Hermes
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-0.5 transition-transform duration-300"
                  />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.06]" />

      <CTA />
    </>
  )
}
