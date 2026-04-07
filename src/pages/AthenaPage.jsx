import PageHero from '../components/PageHero'
import FeatureBlock from '../components/FeatureBlock'
import CTA from '../components/CTA'
import FadeIn from '../components/FadeIn'

export default function AthenaPage() {
  const accent = '#D6A86E'

  return (
    <>
      <PageHero
        bgImage="/college_students_learning_BEST_ONE.png"
        label="Athena"
        headline="Academic Operations"
        subtitle="A unified view of every student's academic journey — past, present, and future."
        accentColor={accent}
        accentGradient="linear-gradient(90deg, #D6A86E, #E8C590)"
      />

      {/* Problem statement */}
      <section className="py-24 lg:py-32 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-xl sm:text-2xl lg:text-[1.75rem] font-light leading-relaxed tracking-[-0.01em]">
              <span className="text-white/45">
                The average university runs dozens of disconnected systems.
              </span>{' '}
              <span className="text-white/85">
                Advisors spend more time navigating software than guiding students.
                Critical data lives in silos. Athena changes that.
              </span>
            </p>
          </FadeIn>
        </div>
      </section>

      <div id="features" className="border-t border-white/[0.06]" />

      {/* Feature 1 */}
      <FeatureBlock
        title="Dream-Driven Paths"
        description="Students declare where they want to go — a career, a graduate program, a credential. Athena surfaces the best paths forward, tailored to their goals and academic standing."
        image={{
          src: '/college_students_fun.jpg',
          alt: 'Students on campus',
        }}
        accentColor={accent}
        reversed={false}
        bullets={[
          'Students describe their goals in their own words — Athena turns ambition into a clear plan',
          'Academic options surfaced and prioritized, not just the ones an advisor already knows',
          "Recommendations grounded in what's actually available right now",
        ]}
      />

      {/* Cinematic break */}
      <div className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
        <img
          src="/college_student_study_session.jpg"
          alt="Students collaborating"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0d1117]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117]" />
      </div>

      {/* Feature 2 */}
      <FeatureBlock
        title="Advisor Superpowers"
        description="One view. Full context. Athena replaces tab-switching and manual audits with a unified student picture that lets advisors do what they were hired to do — guide."
        image={{
          src: '/istockphoto-1363276509-612x612.jpg',
          alt: 'Instructor working with data systems',
        }}
        accentColor={accent}
        reversed={true}
        bullets={[
          'Complete student profile — transcripts, credits, goals, and progress in one place',
          'Explore alternate academic directions without starting from scratch',
          'Outcome-aware guidance that accounts for where a student is headed, not just where they are',
        ]}
      />

      <div className="border-t border-white/[0.06]" />

      {/* Feature 3 */}
      <FeatureBlock
        title="Institutional Intelligence"
        description="Bring fragmented institutional data together. See retention risks, credit gaps, and outcome trends across the entire institution — not one student at a time."
        image={{
          src: '/control_room_image.png',
          alt: 'Data operations center',
        }}
        accentColor={accent}
        reversed={false}
        bullets={[
          'Connects to existing systems — no rip and replace',
          'Transfer students onboarded with full credit clarity from day one',
          'Institutional dashboards for retention, graduation rates, and program health',
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
          <source src="/high_tech_data_connected.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0d1117]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117]" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <FadeIn>
            <div className="text-center px-6">
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/35 font-medium mb-4">
                The Engine
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-light text-white/80 max-w-2xl">
                The full picture — unified, live, and built so students can stop guessing and start pursuing.
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
