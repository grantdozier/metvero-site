import { BookOpen, Users, BarChart3, Zap, Target, Database } from 'lucide-react'
import Hero from '../components/Hero'
import MetveroAlignmentSequence from '../components/MetveroAlignmentSequence'
import ServicesSection from '../components/ServicesSection'
import ProductSection from '../components/ProductSection'
import CTA from '../components/CTA'
import FadeIn from '../components/FadeIn'

const athenaFeatures = [
  {
    icon: BookOpen,
    title: 'Dream-Driven Paths',
    desc: 'Students say where they want to go. Athena lights the way forward.',
  },
  {
    icon: Users,
    title: 'Advisor Superpowers',
    desc: "Every student's full picture in one place. Guidance over data entry.",
  },
  {
    icon: BarChart3,
    title: 'Institutional Intelligence',
    desc: 'Unify fragmented systems. Improve retention and outcomes at scale.',
  },
]

const hermesFeatures = [
  {
    icon: Zap,
    title: 'Performance Analytics',
    desc: 'Training, performance, and readiness data — unified in one view.',
  },
  {
    icon: Target,
    title: 'Compliance & Eligibility',
    desc: 'Compliance tracking and eligibility management — fully automated.',
  },
  {
    icon: Database,
    title: 'Recruiting & Operations',
    desc: 'Recruiting intelligence and game-day operations — streamlined.',
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      <MetveroAlignmentSequence />

      {/* Statement */}
      <section className="py-24 lg:py-32 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-xl sm:text-2xl lg:text-[1.75rem] font-light leading-relaxed tracking-[-0.01em]">
              <span className="text-white/45">
                Strategy. Systems. Products.
              </span>{' '}
              <span className="text-white/85">
                We embed with institutions to turn fragmented operations into
                unified intelligence — making them{' '}
              </span>
              <span className="text-white/45 underline underline-offset-4 decoration-white/20">less reactive</span>
              <span className="text-white/85"> and </span>
              <span className="text-white/45 underline underline-offset-4 decoration-white/20">more transformative</span>
              <span className="text-white/85">.</span>
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="border-t border-white/[0.06]" />

      {/* Services */}
      <ServicesSection />

      <div className="border-t border-white/[0.06]" />

      {/* Athena */}
      <ProductSection
        id="athena"
        name="Athena"
        tagline="Academic Operations"
        description="The unified academic platform that brings every student's journey into a single, clear view."
        features={athenaFeatures}
        accentColor="#D6A86E"
        reversed={false}
        image={{
          src: '/college_students_learning_BEST_ONE.png',
          alt: 'Students collaborating with technology in a modern academic environment',
        }}
        linkTo="/athena"
      />

      {/* Cinematic divider */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <img
          src="/LSU_Stadium.webp"
          alt="Aerial view of athletic campus facilities at night"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0d1117]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117]" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/40 font-medium text-center">
              From the Classroom to the Field
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Hermes */}
      <ProductSection
        id="hermes"
        name="Hermes"
        tagline="Athletic Operations"
        description="Athletics operations, unified. Performance visibility that gives programs a competitive edge."
        features={hermesFeatures}
        accentColor="#5BC0EB"
        reversed={true}
        image={{
          src: '/college_athletics_treadmill_USE_THIS_ONE.png',
          alt: 'Athletic performance monitoring with real-time analytics',
        }}
        linkTo="/hermes"
      />

      <div className="border-t border-white/[0.06]" />

      {/* Stats */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 text-center mb-16">
              Built for Scale
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
            {[
              { value: '3', label: 'Practice Areas' },
              { value: '2', label: 'Flagship Products' },
              { value: '360°', label: 'Institutional View' },
              { value: '∞', label: 'Possibilities' },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold tracking-tight text-white/90 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[13px] text-white/30 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.06]" />

      <CTA />
    </>
  )
}
