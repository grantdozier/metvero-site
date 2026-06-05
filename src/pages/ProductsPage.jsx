import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import CTA from '../components/CTA'
import ProductsHeroGraphic from '../components/ProductsHeroGraphic'

const ease = [0.22, 1, 0.36, 1]

const athenaPillars = [
  { name: 'Pathway', who: 'Students' },
  { name: 'Intervention', who: 'Advisors' },
  { name: 'Operational', who: 'Deans' },
  { name: 'Outcome', who: 'Provosts' },
]

export default function ProductsPage() {
  return (
    <>
      {/* === HERO === */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0d1117]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 lg:pt-24 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — words */}
            <div className="text-center lg:text-left">
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
                className="mt-7 text-3xl sm:text-4xl lg:text-[2.7rem] font-bold tracking-[-0.02em] leading-[1.18]"
              >
                <span className="block text-white/45">
                  The systems built to free institutions are quietly consuming them.
                </span>
                <span className="block text-white/95 mt-4">
                  We built the layer that absorbs the load.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.5, ease }}
                className="mt-7 text-[17px] leading-relaxed text-white/50 max-w-xl mx-auto lg:mx-0"
              >
                Athena and Hermes turn the meta-work of fragmented software into a single
                decision surface — so people make decisions instead of feeding software.
              </motion.p>
            </div>

            {/* Right — graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease }}
            >
              <ProductsHeroGraphic />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/25">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={14} className="text-white/25" />
          </motion.div>
        </motion.div>
      </section>

      <div className="border-t border-white/[0.06]" />

      {/* ================================================================ */}
      {/* ATHENA                                                          */}
      {/* ================================================================ */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.04] pointer-events-none"
          style={{ backgroundColor: '#D6A86E', top: '10%', right: '-5%' }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-8 h-px bg-[#D6A86E]/30" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D6A86E]/50 font-medium">001</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                  The Intelligence Layer for Higher Education
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="text-[16px] text-white/50 leading-relaxed mb-8 max-w-lg">
                  Your systems of record tell you what happened. Athena tells you what it
                  means — sitting on top of the systems an institution already runs and
                  handing advisors a decision, not another alert.
                </p>
              </FadeIn>

              {/* Condensed pillars strip */}
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-2 gap-px bg-white/[0.04] mb-8 max-w-md">
                  {athenaPillars.map((p) => (
                    <div key={p.name} className="bg-[#0d1117] px-4 py-3">
                      <p className="text-[14px] font-semibold text-white/85">{p.name}</p>
                      <p className="text-[11px] tracking-[0.15em] uppercase text-[#D6A86E]/60 mt-0.5">
                        {p.who}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.25}>
                <Link
                  to="/athena"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-300"
                  style={{ color: '#D6A86E' }}
                >
                  Explore Athena
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>
              </FadeIn>
            </div>

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
          src="/lsu_stadium_final_scrubbed.png"
          alt="Aerial view of athletic campus facilities at night"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0d1117]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117]" />
      </div>

      {/* ================================================================ */}
      {/* HERMES                                                          */}
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
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#5BC0EB]/50 font-medium">002</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                  Athletics operations, unified. Performance visibility, automated
                  compliance, and recruiting intelligence — giving programs a competitive
                  edge from the training room to the front office.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Link
                  to="/hermes"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-300"
                  style={{ color: '#5BC0EB' }}
                >
                  Explore Hermes
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* GETTING IT LIVE — light services handoff, after the products     */}
      {/* ================================================================ */}
      <section className="relative py-24 lg:py-32 overflow-hidden border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium mb-8">
              Getting It Live
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="text-xl sm:text-2xl lg:text-[1.75rem] font-light leading-relaxed tracking-[-0.01em]">
              <span className="text-white/85">
                A platform is half the work. Access, integration, and adoption inside a real
                institution
              </span>{' '}
              <span className="text-white/45">
                are a discipline of their own — and where the practice comes in.
              </span>
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10">
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-white/50 hover:text-white/80 transition-colors duration-300"
              >
                See the practice
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="border-t border-white/[0.06]" />

      <CTA />
    </>
  )
}
