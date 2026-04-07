import { motion } from 'framer-motion'
import { Brain, Layers, Box } from 'lucide-react'
import FadeIn from './FadeIn'

const services = [
  {
    icon: Brain,
    title: 'AI Strategy & Advisory',
    description:
      'We assess your data landscape, identify the highest-impact AI opportunities, and architect the roadmap — before a single line of code is written.',
    details: [
      'Institutional AI readiness assessments',
      'Data infrastructure & pipeline design',
      'Build vs. buy analysis',
    ],
  },
  {
    icon: Layers,
    title: 'Systems Integration',
    description:
      'We connect your fragmented tools into a unified intelligence layer. No rip-and-replace — we meet you where you are and build forward.',
    details: [
      'Legacy system modernization',
      'API & data unification',
      'Real-time analytics infrastructure',
    ],
  },
  {
    icon: Box,
    title: 'Purpose-Built Products',
    description:
      'When off-the-shelf won\'t cut it, we design and engineer custom platforms purpose-built for your operations.',
    details: [
      'End-to-end product development',
      'AI/ML model design & deployment',
      'Ongoing iteration & support',
    ],
  },
]

function ServiceCard({ service, index }) {
  return (
    <FadeIn delay={0.15 + index * 0.12}>
      <div className="group relative h-full">
        {/* Card */}
        <div className="relative h-full p-8 sm:p-10 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.035] transition-all duration-500">
          {/* Top accent line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Icon */}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-7 border border-white/[0.08] bg-white/[0.03]">
            <service.icon
              size={22}
              strokeWidth={1.4}
              className="text-white/70"
            />
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-semibold text-white/90 tracking-[-0.01em] mb-4">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[14px] sm:text-[15px] text-white/40 leading-relaxed mb-8">
            {service.description}
          </p>

          {/* Detail bullets */}
          <div className="space-y-3">
            {service.details.map((detail, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-white/25 shrink-0" />
                <span className="text-[13px] text-white/50 leading-relaxed">
                  {detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 lg:py-36 overflow-hidden">
      {/* Background glow — subtle, centered */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[250px] opacity-[0.03] pointer-events-none"
        style={{ backgroundColor: '#ffffff' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20 lg:mb-24">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium mb-6">
              Our Practice
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em] leading-[1.1] mb-6 max-w-2xl mx-auto">
              We start with your problem.
              <br />
              <span className="text-white/40">Not our product.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-[15px] sm:text-[16px] text-white/40 leading-relaxed max-w-lg mx-auto">
              From strategy to deployment, we embed with your team and build intelligence that actually ships.
            </p>
          </FadeIn>
        </div>

        {/* Service cards — 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.03]">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Bottom connector — bridges to products below */}
        <FadeIn delay={0.5}>
          <div className="mt-20 lg:mt-24 text-center">
            <p className="text-[13px] text-white/30 leading-relaxed max-w-md mx-auto">
              Our consulting practice has produced two flagship platforms for higher education — built from the ground up to solve problems no existing tool could.
            </p>
            <div className="mt-8 flex items-center justify-center">
              <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
