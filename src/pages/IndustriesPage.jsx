import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import CTA from '../components/CTA'
import IndustriesHeroGraphic from '../components/IndustriesHeroGraphic'

const ease = [0.22, 1, 0.36, 1]

const industries = [
  {
    name: 'Higher Education',
    status: 'Live',
    accent: '#D6A86E',
    img: '/college_students_learning_BEST_ONE.png',
    desc: 'Academic operations reconciled into one decision surface — so advisors guide, and students move with clarity instead of guesswork.',
    focus: [
      'Student success and retention',
      'Advising at scale',
      'Transfer and credit clarity',
      'Institutional outcome visibility',
    ],
    link: { to: '/athena', label: 'See Athena' },
  },
  {
    name: 'Collegiate Athletics',
    status: 'Live',
    accent: '#5BC0EB',
    img: '/college_athletics_treadmill_USE_THIS_ONE.png',
    desc: 'Performance, compliance, and recruiting unified for the pace of collegiate athletics — from the training room to the front office.',
    focus: [
      'Performance and readiness',
      'Compliance and eligibility',
      'Recruiting intelligence',
      'Academic-athletic integration',
    ],
    link: { to: '/hermes', label: 'See Hermes' },
  },
  {
    name: 'Government & Public Sector',
    status: 'Emerging',
    accent: '#C87533',
    img: '/control_room_image.png',
    desc: 'The same method points toward public institutions, where coordination across agencies and legacy systems is the core challenge.',
    focus: ['Cross-agency coordination', 'Service delivery', 'Operational visibility'],
    link: null,
  },
  {
    name: 'Defense & National Security',
    status: 'Emerging',
    accent: '#C44536',
    img: '/vector_db_security_image.png',
    desc: 'Mission-critical environments demand decisions that are sourced, explainable, and human-final — the principles the practice is built on.',
    focus: ['Decision support', 'Secure systems integration', 'Explainable, human-final intelligence'],
    link: null,
  },
]

export default function IndustriesPage() {
  return (
    <>
      {/* === HEADER === */}
      <section className="pt-32 lg:pt-40 pb-20 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease }}
              >
                <span className="inline-block text-[11px] tracking-[0.35em] uppercase text-white/40 font-medium mb-6">
                  Industries
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease }}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.02em] leading-[1.1] max-w-2xl"
              >
                Where intelligence
                <br />
                <span className="text-white/40">has to hold.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.0, ease }}
                className="mt-6 text-[17px] leading-relaxed text-white/50 max-w-lg"
              >
                The practice is built for institutions where operations are fragmented and the
                stakes are high. Two are live today; others are where the method points next.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease }}
            >
              <IndustriesHeroGraphic />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.06]" />

      {/* === INDUSTRY BLOCKS === */}
      {industries.map((ind, i) => {
        const reversed = i % 2 !== 0
        const live = ind.status === 'Live'
        return (
          <section key={ind.name} className="relative py-24 lg:py-36 overflow-hidden">
            <div
              className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.04] pointer-events-none"
              style={{ backgroundColor: ind.accent, top: '10%', ...(reversed ? { left: '-5%' } : { right: '-5%' }) }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text */}
                <div className={reversed ? 'lg:order-2' : ''}>
                  <FadeIn>
                    <div className="flex items-center gap-3 mb-6">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: live ? '#4ade80' : ind.accent }}
                      />
                      <span className="text-[11px] tracking-[0.25em] uppercase font-medium text-white/40">
                        {live ? 'Live Today' : 'On the Horizon'}
                      </span>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.08}>
                    <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-[-0.02em] mb-6">
                      {ind.name}
                    </h2>
                  </FadeIn>

                  <FadeIn delay={0.15}>
                    <p className="text-[16px] text-white/45 leading-relaxed mb-10 max-w-lg">
                      {ind.desc}
                    </p>
                  </FadeIn>

                  <div className="space-y-3">
                    {ind.focus.map((f, j) => (
                      <FadeIn key={f} delay={0.2 + j * 0.06}>
                        <div className="flex items-start gap-3">
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: `${ind.accent}` }}
                          />
                          <p className="text-[14px] text-white/50 leading-relaxed">{f}</p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>

                  {ind.link && (
                    <FadeIn delay={0.4}>
                      <Link
                        to={ind.link.to}
                        className="group inline-flex items-center gap-2 mt-9 text-[13px] font-medium transition-colors duration-300"
                        style={{ color: ind.accent }}
                      >
                        {ind.link.label}
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                      </Link>
                    </FadeIn>
                  )}
                </div>

                {/* Image */}
                <div className={reversed ? 'lg:order-1' : ''}>
                  <FadeIn direction={reversed ? 'left' : 'right'} delay={0.2} duration={0.9}>
                    <div className="relative aspect-[4/3] w-full">
                      <div
                        className="absolute -inset-4 rounded-3xl blur-[80px] opacity-[0.12]"
                        style={{ backgroundColor: ind.accent }}
                      />
                      <div className="relative h-full rounded-xl overflow-hidden border border-white/[0.08]">
                        <img src={ind.img} alt={ind.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/55 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/20 via-transparent to-[#0d1117]/20" />
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>

            {i < industries.length - 1 && (
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="border-t border-white/[0.06] mt-24 lg:mt-36" />
              </div>
            )}
          </section>
        )
      })}

      <div className="border-t border-white/[0.06]" />

      <CTA />
    </>
  )
}
