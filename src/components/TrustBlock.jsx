import { FileSearch, Eye, MessageSquare, UserCheck } from 'lucide-react'
import FadeIn from './FadeIn'

const PROPERTIES = [
  {
    icon: FileSearch,
    label: 'Sourced',
    desc: 'Every conclusion traces back to the system and record it came from.',
  },
  {
    icon: Eye,
    label: 'Explainable',
    desc: 'The reasoning is visible — the cause, the options, and the trade-offs.',
  },
  {
    icon: MessageSquare,
    label: 'Challengeable',
    desc: 'Disagree, and the override becomes signal the layer learns from.',
  },
  {
    icon: UserCheck,
    label: 'Human-final',
    desc: 'The platform assembles the decision; a person always makes the call.',
  },
]

export default function TrustBlock({ accentColor = '#D6A86E' }) {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden border-t border-white/[0.06]">
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[220px] opacity-[0.025] pointer-events-none"
        style={{ backgroundColor: accentColor, top: '20%', right: '-10%' }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20 max-w-2xl mx-auto">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium mb-6">
              Trust by Design
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em] leading-[1.1] mb-6">
              Sourced, explainable,
              <br />
              <span className="text-white/40">and challengeable.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[15px] sm:text-[16px] text-white/40 leading-relaxed">
              Adopting intelligence comes down to trusting it. Metvero earns that trust by
              design — every conclusion is sourced and open to challenge, and a person always
              makes the call. The platform carries the busywork, so people are free for the
              work only they can do: judgment, relationships, the decision itself.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.03]">
          {PROPERTIES.map((prop, i) => (
            <FadeIn key={prop.label} delay={0.12 + i * 0.08}>
              <div className="h-full p-7 lg:p-8 bg-[#0d1117]">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 border"
                  style={{ borderColor: `${accentColor}22`, backgroundColor: `${accentColor}0d` }}
                >
                  <prop.icon size={18} strokeWidth={1.5} style={{ color: accentColor }} />
                </div>
                <h3 className="text-[15px] font-semibold text-white/90 mb-2.5">
                  {prop.label}
                </h3>
                <p className="text-[13px] text-white/40 leading-relaxed">
                  {prop.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="mt-14 lg:mt-16 text-center text-[15px] sm:text-[16px] text-white/45 leading-relaxed max-w-2xl mx-auto">
            And it arrives the way trust is built — a verifiable piece at a time, with the
            systems people already rely on left in plain view, earning more of the work only
            once it has earned its place.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
