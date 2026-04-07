import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import CTA from '../components/CTA'
import DiscoveryMap from '../components/diagrams/DiscoveryMap'
import PerspectiveWheel from '../components/diagrams/PerspectiveWheel'
import UnificationDiagram from '../components/diagrams/UnificationDiagram'
import BlueprintDiagram from '../components/diagrams/BlueprintDiagram'
import ProcessTimeline from '../components/diagrams/ProcessTimeline'

const services = [
  {
    id: 'strategy',
    label: 'AI Strategy & Advisory',
    headline: 'See the Whole Board',
    description:
      'Before writing a single line of code, we map your institutional data landscape, identify the highest-impact AI opportunities, and architect a roadmap that actually gets executed — not a slide deck that collects dust.',
    bullets: [
      'Comprehensive AI readiness assessments across your organization',
      'Technology landscape analysis — what you have, what you need, and where to start',
      'Honest build vs. buy recommendations grounded in your reality, not vendor hype',
    ],
    Visual: DiscoveryMap,
  },
  {
    id: 'integration',
    label: 'Systems Integration',
    headline: 'One Source of Truth',
    description:
      'Your institution runs on dozens of disconnected tools. We connect them into a unified intelligence layer without ripping out what works.',
    bullets: [
      'Legacy system modernization and unification across your technology stack',
      'Modern data infrastructure that keeps every system in sync',
      'Migration strategies designed around continuity — we meet you where you are and build forward',
    ],
    Visual: UnificationDiagram,
  },
  {
    id: 'products',
    label: 'Purpose-Built Products',
    headline: 'Engineered From Scratch',
    description:
      'When off-the-shelf tools force you to reshape your operations around their limitations, we do the opposite. We design and engineer custom platforms built around the way your institution actually works.',
    bullets: [
      'End-to-end product development — from discovery workshops to production deployment',
      'AI capabilities designed and embedded directly into your workflows',
      'Ongoing iteration and support — we ship fast, then evolve based on real usage',
    ],
    Visual: BlueprintDiagram,
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* === HEADER — compact, no full-screen hero === */}
      <section className="pt-32 lg:pt-40 pb-20 lg:pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[11px] tracking-[0.35em] uppercase text-white/40 font-medium mb-6">
              Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.02em] leading-[1.1] max-w-2xl"
          >
            AI Consulting
            <br />
            <span className="text-white/40">& Engineering</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[17px] leading-relaxed text-white/50 max-w-lg"
          >
            From strategy to production — we design, build, and deploy the intelligent systems organizations operate on.
          </motion.p>
        </div>
      </section>

      <div id="services-detail" className="border-t border-white/[0.06]" />

      {/* === SERVICE PILLARS WITH VISUALIZATIONS === */}
      {services.map((service, i) => {
        const reversed = i % 2 !== 0
        const Visual = service.Visual

        return (
          <section key={service.id} className="relative py-24 lg:py-36 overflow-hidden">
            {/* Background glow */}
            <div
              className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.02] pointer-events-none"
              style={{
                backgroundColor: '#ffffff',
                top: '10%',
                ...(reversed ? { left: '-5%' } : { right: '-5%' }),
              }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text content */}
                <div className={reversed ? 'lg:order-2' : ''}>
                  <FadeIn>
                    <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-5 text-white/40">
                      {service.label}
                    </p>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                    <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-[-0.02em] mb-6">
                      {service.headline}
                    </h2>
                  </FadeIn>

                  <FadeIn delay={0.15}>
                    <p className="text-[16px] text-white/45 leading-relaxed mb-10 max-w-lg">
                      {service.description}
                    </p>
                  </FadeIn>

                  <div className="space-y-3">
                    {service.bullets.map((bullet, j) => (
                      <FadeIn key={j} delay={0.2 + j * 0.06}>
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-white/20" />
                          <p className="text-[14px] text-white/50 leading-relaxed">
                            {bullet}
                          </p>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>

                {/* Visualization */}
                <div className={reversed ? 'lg:order-1' : ''}>
                  <FadeIn
                    direction={reversed ? 'left' : 'right'}
                    delay={0.2}
                    duration={0.9}
                  >
                    <Visual />
                  </FadeIn>
                </div>
              </div>
            </div>

            {/* Divider after each section except the last */}
            {i < services.length - 1 && (
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="border-t border-white/[0.06] mt-24 lg:mt-36" />
              </div>
            )}
          </section>
        )
      })}

      {/* === EVERY PERSPECTIVE — Role grid === */}
      <section className="relative py-24 lg:py-36 overflow-hidden border-t border-white/[0.06]">
        {/* Background video — subtle, atmospheric */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/high_tech_data_connected.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#0d1117]/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <FadeIn>
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/30 font-medium mb-6">
                Unique Perspective
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.02em] leading-[1.1] mb-6">
                We design from <span className="underline underline-offset-4 decoration-white/30">every role</span>
                <br />
                <span className="text-white/40">in the organization.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-[15px] text-white/40 leading-relaxed max-w-md mx-auto">
                One system has to work for all of these people — or it doesn't work at all.
              </p>
            </FadeIn>
          </div>

          {/* Perspective Wheel */}
          <PerspectiveWheel />

          {/* Closing line */}
          <FadeIn delay={0.9}>
            <p className="text-center mt-10 text-[14px] text-white/35 max-w-sm mx-auto leading-relaxed">
              Every role has a different workflow, a different pain point, and a different definition of success. We account for all of them.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* === HOW WE WORK — Process Timeline === */}
      <section className="py-24 lg:py-36 border-t border-white/[0.06]">
        <div className="text-center mb-16 lg:mb-20 px-6">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium mb-6">
              How We Work
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em] leading-[1.1] mb-6">
              Four Phases. One Mission.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[15px] sm:text-[16px] text-white/40 leading-relaxed max-w-lg mx-auto">
              Every engagement follows the same disciplined arc — from understanding to impact.
            </p>
          </FadeIn>
        </div>

        <ProcessTimeline />
      </section>

      <div className="border-t border-white/[0.06]" />

      {/* === WHAT WE DELIVER === */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium mb-6">
              What We Deliver
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="text-xl sm:text-2xl lg:text-[1.75rem] font-light leading-relaxed tracking-[-0.01em]">
              <span className="text-white/85">
                Custom consulting engagements, purpose-built platforms in
                production, and new verticals on the horizon —
              </span>{' '}
              <span className="text-white/45">
                all from the same practice.
              </span>
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-white/50 hover:text-white/80 transition-colors duration-300"
              >
                See our products
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-0.5 transition-transform duration-300"
                />
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
