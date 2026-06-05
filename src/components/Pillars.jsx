import { Compass, Users, Gauge, TrendingUp } from 'lucide-react'
import FadeIn from './FadeIn'

const PILLARS = [
  {
    icon: Compass,
    name: 'Pathway Intelligence',
    audience: 'For students',
    decision: 'A clear path from who they are to who they want to be.',
  },
  {
    icon: Users,
    name: 'Intervention Intelligence',
    audience: 'For advisors',
    decision: 'The right student, at the right moment, with real options.',
  },
  {
    icon: Gauge,
    name: 'Operational Intelligence',
    audience: 'For deans',
    decision: 'See where capacity strains, and where to act.',
  },
  {
    icon: TrendingUp,
    name: 'Outcome Intelligence',
    audience: 'For provosts',
    decision: 'Proof the institution is moving — and what’s moving it.',
  },
]

export default function Pillars({
  accentColor = '#D6A86E',
  eyebrow = 'Four Pillars',
  title = 'One layer. Four kinds of intelligence.',
  intro = 'Built for everyone the institution runs on — from the student to the provost.',
}) {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden">
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.03] pointer-events-none"
        style={{ backgroundColor: accentColor, top: '8%', left: '50%', transform: 'translateX(-50%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20 max-w-2xl mx-auto">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium mb-6">
              {eyebrow}
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em] leading-[1.1] mb-6">
              {title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[15px] sm:text-[16px] text-white/40 leading-relaxed">
              {intro}
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.03]">
          {PILLARS.map((pillar, i) => (
            <FadeIn key={pillar.name} delay={0.12 + i * 0.08}>
              <div className="group relative h-full p-8 sm:p-10 bg-[#0d1117] hover:bg-white/[0.02] transition-colors duration-500">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-7 border"
                  style={{ borderColor: `${accentColor}22`, backgroundColor: `${accentColor}0d` }}
                >
                  <pillar.icon size={20} strokeWidth={1.5} style={{ color: accentColor }} />
                </div>

                <p
                  className="text-[11px] tracking-[0.25em] uppercase font-medium mb-3"
                  style={{ color: `${accentColor}99` }}
                >
                  {pillar.audience}
                </p>

                <h3 className="text-xl sm:text-2xl font-semibold text-white/90 tracking-[-0.01em] mb-5">
                  {pillar.name}
                </h3>

                <p className="text-[16px] text-white/55 leading-relaxed font-light">
                  {pillar.decision}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
