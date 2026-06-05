import {
  Activity,
  ShieldCheck,
  Radar,
  CalendarClock,
  GraduationCap,
  HeartPulse,
  Dumbbell,
  ClipboardCheck,
  Users,
  Trophy,
  BookOpen,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import FeatureBlock from '../components/FeatureBlock'
import CTA from '../components/CTA'
import FadeIn from '../components/FadeIn'

const accentBlue = '#5BC0EB'

const hermesCapabilities = [
  { icon: Activity, title: 'Performance & Readiness', desc: 'Training load, conditioning, and readiness unified across every program.' },
  { icon: ShieldCheck, title: 'Compliance & Eligibility', desc: 'APR, CARA hours, and eligibility matrices monitored continuously.' },
  { icon: Radar, title: 'Recruiting Intelligence', desc: 'Pipeline and evaluation from prospect to signed athlete.' },
  { icon: CalendarClock, title: 'Game-Week Operations', desc: 'Travel, rosters, and logistics coordinated in one place.' },
  { icon: GraduationCap, title: 'Academic-Athletic Integration', desc: 'Class schedules and athletic calendars reconciled before they collide.' },
  { icon: HeartPulse, title: 'Athlete Wellbeing', desc: 'Health, recovery, and support surfaced alongside performance.' },
]

const hermesRoles = [
  { icon: Dumbbell, role: 'Performance Staff', note: 'Readiness, load, and risk across every athlete' },
  { icon: ClipboardCheck, role: 'Compliance & Eligibility', note: 'Continuous monitoring, not deadline scrambles' },
  { icon: Users, role: 'Coaching Staff', note: "Who's ready, who's at risk, who's trending up" },
  { icon: Trophy, role: 'Athletic Directors', note: 'Program health across every sport in one view' },
  { icon: BookOpen, role: 'Academic-Athletic Advisors', note: 'Academic progress and athletic schedule, reconciled' },
]

const hermesOutcomes = [
  { stat: 'Hours back', label: 'Administrative load handled, so staff time returns to athletes.' },
  { stat: 'Caught early', label: 'Schedule conflicts surfaced before they reach a roster.' },
  { stat: 'One view', label: 'Performance, compliance, and recruiting in a single system.' },
  { stat: 'Always current', label: 'Eligibility tracked continuously, not at the deadline.' },
]

export default function HermesPage() {
  const accent = accentBlue

  return (
    <>
      <PageHero
        bgImage="/lsu_stadium_final_scrubbed.png"
        label="Hermes"
        headline="Athletic Operations"
        subtitle="Real-time performance intelligence that gives programs a competitive edge across every dimension."
        accentColor={accent}
        accentGradient="linear-gradient(90deg, #5BC0EB, #6FD3FF)"
      />

      {/* Problem statement */}
      <section className="py-24 lg:py-32 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-xl sm:text-2xl lg:text-[1.75rem] font-light leading-relaxed tracking-[-0.01em]">
              <span className="text-white/45">
                Training data. Compliance matrices. Recruiting pipelines. Game-day operations.
              </span>{' '}
              <span className="text-white/85">
                Hermes brings it all into one system — built for the pace of collegiate athletics.
              </span>
            </p>
          </FadeIn>
        </div>
      </section>

      <div id="features" className="border-t border-white/[0.06]" />

      {/* === CAPABILITIES AT A GLANCE === */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[250px] opacity-[0.04] pointer-events-none"
          style={{ backgroundColor: accentBlue }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20 max-w-2xl mx-auto">
            <FadeIn>
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium mb-6">
                Capabilities
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em] leading-[1.1] mb-6">
                One system. Every front.
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-[15px] sm:text-[16px] text-white/40 leading-relaxed">
                The work of a modern program runs on a dozen disconnected tools. Hermes brings
                the fronts that matter into a single operating picture.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.03]">
            {hermesCapabilities.map((cap, i) => (
              <FadeIn key={cap.title} delay={0.1 + i * 0.06}>
                <div className="group h-full p-8 lg:p-9 bg-[#0d1117] hover:bg-white/[0.02] transition-colors duration-500">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-7 border"
                    style={{ borderColor: `${accentBlue}22`, backgroundColor: `${accentBlue}0d` }}
                  >
                    <cap.icon size={20} strokeWidth={1.5} style={{ color: accentBlue }} />
                  </div>
                  <h3 className="text-[17px] font-semibold text-white/90 tracking-[-0.01em] mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-[14px] text-white/40 leading-relaxed">{cap.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* === BUILT FOR EVERY SEAT — roles === */}
      <section className="relative py-24 lg:py-32 overflow-hidden border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <FadeIn>
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium mb-6">
                Built for Every Seat
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-[-0.02em] leading-[1.1] mb-6">
                One picture, read five ways.
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-[15px] sm:text-[16px] text-white/40 leading-relaxed">
                Each role sees the program through a different lens. Hermes serves all of them
                from the same source of truth.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/[0.03]">
            {hermesRoles.map((r, i) => (
              <FadeIn key={r.role} delay={0.1 + i * 0.06}>
                <div className="group h-full p-7 bg-[#0d1117] hover:bg-white/[0.02] transition-colors duration-500">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 border"
                    style={{ borderColor: `${accentBlue}22`, backgroundColor: `${accentBlue}0d` }}
                  >
                    <r.icon size={18} strokeWidth={1.5} style={{ color: accentBlue }} />
                  </div>
                  <h3 className="text-[14px] font-semibold text-white/90 mb-2 leading-snug">{r.role}</h3>
                  <p className="text-[12px] text-white/35 leading-relaxed">{r.note}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-white/[0.06]" />

      {/* Feature 1 */}
      <FeatureBlock
        title="Performance Analytics"
        description="Training, conditioning, and readiness data — unified in one view. See who's peaking, who's at risk, and who's ready to compete."
        image={{
          src: '/college_athletics_treadmill_USE_THIS_ONE.png',
          alt: 'Athletic performance monitoring with real-time data',
        }}
        accentColor={accent}
        reversed={false}
        bullets={[
          'Holistic athlete performance data unified across every program',
          'Readiness and injury risk visibility updated in real time',
          'Progression tracking across every athlete and position',
        ]}
      />

      {/* Cinematic break */}
      <div className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
        <img
          src="/college_sports_cool_lacrosse_photo.png"
          alt="College athlete in action"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0d1117]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117]" />
      </div>

      {/* Feature 2 */}
      <FeatureBlock
        title="Compliance & Eligibility"
        description="APR tracking, CARA hours, eligibility matrices — fully automated. Hermes keeps programs compliant without the manual overhead."
        image={{
          src: '/vector_db_security_image.png',
          alt: 'Data network visualization',
        }}
        accentColor={accent}
        reversed={true}
        bullets={[
          'Automated Academic Progress Rate tracking across every roster',
          'CARA hours monitoring with real-time threshold alerts',
          'Academic and athletic schedules stay in sync — conflicts caught before they happen',
        ]}
      />

      <div className="border-t border-white/[0.06]" />

      {/* Feature 3 */}
      <FeatureBlock
        title="Recruiting & Operations"
        description="Recruiting intelligence, performance evaluation, and game week operations — from prospect to program."
        image={{
          src: '/college_athletics_techy_data_analytics.png',
          alt: 'Athletic data analytics visualization',
        }}
        accentColor={accent}
        reversed={false}
        bullets={[
          'Recruiting pipeline intelligence from prospect to signed athlete',
          'Performance evaluation tools built for your conference and competition level',
          'Game week operations and roster management in one place',
        ]}
      />

      {/* Video section */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/abstract_data_futuristic_clip.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0d1117]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117]" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <FadeIn>
            <div className="text-center px-6">
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/35 font-medium mb-4">
                Built for Speed
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-light text-white/80 max-w-2xl">
                From training room to front office. Every metric, every roster, every student athlete, every decision — <span className="text-white/40">unified and live.</span>
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* === OUTCOMES — what changes === */}
      <section className="py-24 lg:py-32 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium text-center mb-16">
              What Changes
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {hermesOutcomes.map((o, i) => (
              <FadeIn key={o.stat} delay={i * 0.1}>
                <div className="text-center sm:text-left">
                  <div
                    className="text-2xl lg:text-[1.75rem] font-bold tracking-tight mb-3"
                    style={{ color: accentBlue }}
                  >
                    {o.stat}
                  </div>
                  <p className="text-[14px] text-white/45 leading-relaxed">{o.label}</p>
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
