import PageHero from '../components/PageHero'
import FeatureBlock from '../components/FeatureBlock'
import CTA from '../components/CTA'
import FadeIn from '../components/FadeIn'

export default function HermesPage() {
  const accent = '#5BC0EB'

  return (
    <>
      <PageHero
        bgImage="/LSU_Stadium.webp"
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

      {/* Feature 1 */}
      <FeatureBlock
        title="Performance Analytics"
        description="Body composition, training load, strength metrics, and readiness — unified in one view. See who's peaking, who's at risk, and who's ready to compete."
        image={{
          src: '/college_athletics_treadmill_USE_THIS_ONE.png',
          alt: 'Athletic performance monitoring with real-time data',
        }}
        accentColor={accent}
        reversed={false}
        bullets={[
          'Integrated body composition, strength, and conditioning data across every athlete',
          'Readiness scoring and injury risk indicators updated in real time',
          'Position-specific benchmarks and progression tracking',
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
        description="Pipeline analytics, combine benchmarks, position-specific scouting, and game week operations — from prospect to program."
        image={{
          src: '/college_athletics_techy_data_analytics.png',
          alt: 'Athletic data analytics visualization',
        }}
        accentColor={accent}
        reversed={false}
        bullets={[
          'Recruiting pipeline intelligence with prospect scoring and fit analysis',
          'Combine and performance benchmarks by position and conference',
          'Game week operational planning and depth chart management',
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

      <div className="border-t border-white/[0.06]" />

      <CTA />
    </>
  )
}
