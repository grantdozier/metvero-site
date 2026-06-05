import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import FeatureBlock from '../components/FeatureBlock'
import Pillars from '../components/Pillars'
import ContrastBlock from '../components/ContrastBlock'
import TrustBlock from '../components/TrustBlock'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import FadeIn from '../components/FadeIn'

const accent = '#D6A86E'
const ease = [0.22, 1, 0.36, 1]

const systemsOfRecord = ['Workday', 'Banner', 'Moodle', 'Student Information Systems', 'The rest']

const athenaFaqs = [
  {
    q: 'Does Metvero replace the systems an institution already runs?',
    a: 'No. Metvero is an overlay. It sits on top of the systems of record an institution already operates and turns them into a single decision surface — without a rip-and-replace migration.',
  },
  {
    q: 'Is the AI making decisions about students?',
    a: 'No. The platform assembles the decision — sourced, explainable, and challengeable — and a human always makes the call. Every recommendation traces back to the record it came from, and an advisor can override it.',
  },
  {
    q: 'How does this differ from an early-alert or advising platform?',
    a: 'Alert platforms surface a flag and hand the work back. Metvero does the reconciliation behind the flag — the cause, the options, and the next move — so the load comes off the advisor instead of landing on them.',
  },
  {
    q: 'What does it take to get live inside an institution?',
    a: 'A secure integration with existing systems and a college-by-college pilot. That work is handled by the services practice — the platform is the destination, getting there safely is its own discipline.',
  },
]

export default function AthenaPage() {
  return (
    <>
      {/* === CATEGORY-DEFINING HERO === */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/college_students_learning_BEST_ONE.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0d1117]/82" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-[#0d1117]/55" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
          {/* Eyebrow — identity + category */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <span
              className="text-[12px] tracking-[0.3em] uppercase font-bold"
              style={{
                background: 'linear-gradient(90deg, #D6A86E, #E8C590)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Athena
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/40 font-medium">
              The Intelligence Layer for Higher Education
            </span>
          </motion.div>

          {/* Headline — the canonical position */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease }}
            className="mt-8 text-[clamp(1.9rem,5vw,3.6rem)] font-bold tracking-[-0.02em] leading-[1.12]"
          >
            <span className="text-white/45">
              Your systems of record tell you what happened.
            </span>
            <br />
            <span className="text-white/95">Metvero tells you what it means.</span>
          </motion.h1>

          {/* Subhead — overlay + absorb wedge */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.3, ease }}
            className="mt-8 text-[17px] leading-relaxed text-white/55 max-w-2xl mx-auto"
          >
            It sits on top of Workday, Banner, Moodle, and the rest — and hands your
            advisors a decision, not another alert.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.8, ease }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="#pillars"
              className="group inline-flex items-center gap-2.5 bg-white text-[#0d1117] px-6 py-3 text-[13px] font-semibold hover:bg-white/90 transition-all duration-300"
            >
              See the Four Pillars
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 px-6 py-3 text-[13px] font-medium border border-white/[0.12] hover:border-white/[0.2] transition-all duration-300"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/25">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={14} className="text-white/25" />
          </motion.div>
        </motion.div>
      </section>

      {/* === PAIN-FIRST — the load, not the tech === */}
      <section className="py-24 lg:py-32 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium mb-8">
              The Load
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="text-2xl sm:text-3xl lg:text-[2.1rem] font-light leading-[1.35] tracking-[-0.01em]">
              <span className="text-white/90">
                The benchmark is three hundred students to one advisor. Many carry far more —
                each record spread across systems that were never built to talk.
              </span>{' '}
              <span className="text-white/45">
                Metvero does the reconciliation, so advisors can do the advising.
              </span>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* === THE OVERLAY POSITION === */}
      <section className="relative py-20 lg:py-28 overflow-hidden border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium mb-6">
              The Overlay Position
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold tracking-[-0.02em] leading-[1.15] mb-6 max-w-2xl mx-auto">
              One decision surface on top of the systems already in place.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-[15px] sm:text-[16px] text-white/40 leading-relaxed max-w-lg mx-auto mb-12">
              Athena reconciles fragmented systems of record into a single, coherent view —
              and leaves every one of them running. Adoption is additive, never a migration.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {systemsOfRecord.map((sys) => (
                <span
                  key={sys}
                  className="text-[12px] tracking-wide text-white/55 px-4 py-2 border border-white/[0.08] bg-white/[0.02] rounded-full"
                >
                  {sys}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* === THE FOUR PILLARS === */}
      <div id="pillars" className="border-t border-white/[0.06]" />
      <Pillars
        accentColor={accent}
        eyebrow="The Four Pillars"
        title="One layer. Four kinds of intelligence."
        intro="Built for everyone the institution runs on — from the student to the provost."
      />

      <div className="border-t border-white/[0.06]" />

      {/* === INSIDE THE LAYER — concrete capability === */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium mb-6">
              Inside the Layer
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.02em] leading-[1.1]">
              What the pillars look like in practice.
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* Feature 1 */}
      <FeatureBlock
        title="Dream-Driven Paths"
        description="Students declare where they want to go — a career, a graduate program, a credential. Athena surfaces the routes forward, tailored to their goals and academic standing."
        image={{ src: '/college_students_fun.jpg', alt: 'Students on campus' }}
        accentColor={accent}
        reversed={false}
        bullets={[
          'Students describe their ambition in their own words — Athena turns it into a clear plan',
          'Academic options surfaced and prioritized, not just the ones already top of mind',
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
        image={{ src: '/istockphoto-1363276509-612x612.jpg', alt: 'Instructor working with data systems' }}
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
        image={{ src: '/control_room_image.png', alt: 'Data operations center' }}
        accentColor={accent}
        reversed={false}
        bullets={[
          'Connects to existing systems — no rip and replace',
          'Transfer students onboarded with full credit clarity from day one',
          'Institutional dashboards for retention, graduation rates, and program health',
        ]}
      />

      {/* === WHAT MAKES IT DIFFERENT === */}
      <ContrastBlock
        accentColor={accent}
        eyebrow="The Difference"
        title="Not another dashboard."
      />

      {/* === TRUST AS A FEATURE === */}
      <TrustBlock accentColor={accent} />

      {/* === FAQ === */}
      <FAQ items={athenaFaqs} accentColor={accent} title="What institutions ask first." />

      <div className="border-t border-white/[0.06]" />

      <CTA />
    </>
  )
}
