import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import CTA from '../components/CTA'
import InsightsHeroGraphic from '../components/InsightsHeroGraphic'

const ease = [0.22, 1, 0.36, 1]

const featured = {
  category: 'Positioning',
  title: 'The intelligence layer is a category, not a feature.',
  body: 'For decades, institutional software has answered one question: what happened. The next layer answers a harder one — what it means. That shift, from recording to reasoning, is a category of its own. And the right place for it is on top of the systems already in place, turning them into a single decision surface rather than replacing them.',
}

const perspectives = [
  {
    category: 'Product',
    title: 'Absorb the load. Don’t add to it.',
    body: 'Most platforms create work: another alert, another queue, another screen to check. Intelligence earns its place when it removes work — doing the reconciliation a person would otherwise do by hand, and handing back a decision instead of a task.',
  },
  {
    category: 'Trust',
    title: 'If people can’t challenge it, they won’t trust it.',
    body: 'Adoption stalls when a system asks to be believed. It succeeds when every conclusion is sourced, the reasoning is visible, and a person can override it — so disagreement becomes signal the layer learns from, not friction to route around.',
  },
  {
    category: 'Design',
    title: 'Start with the decision, not the dashboard.',
    body: 'A feature list answers "what does it do." The better question is "what call does this person have to make, and what do they need to make it well." Design from the decision, and the interface follows.',
  },
  {
    category: 'Practice',
    title: 'The hard part is rarely the model.',
    body: 'The real work is access and adoption: integrating securely with systems of record, earning the right to use sensitive data, and fitting into how an institution actually operates. That groundwork is the discipline — not a footnote to the software.',
  },
  {
    category: 'Method',
    title: 'From the classroom to the field.',
    body: 'Academics and athletics look like different worlds, but the problem rhymes: fragmented systems, constrained people, and decisions that cannot wait. One method serves both.',
  },
  {
    category: 'People',
    title: 'Give people their judgment back.',
    body: 'When the people a system was built to serve spend their days feeding it instead, the institution loses what it can least afford: their judgment. Absorb the busywork, and advisors advise, deans lead, and students decide — the work no software can do for them.',
  },
]

export default function InsightsPage() {
  return (
    <>
      {/* === HEADER === */}
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease }}
              >
                <span className="inline-block text-[11px] tracking-[0.35em] uppercase text-white/40 font-medium mb-6">
                  Perspectives
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease }}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.02em] leading-[1.1] max-w-2xl"
              >
                The Metvero
                <br />
                <span className="text-white/40">point of view.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.0, ease }}
                className="mt-6 text-[17px] leading-relaxed text-white/50 max-w-lg"
              >
                Where the practice has landed on the questions that decide whether intelligence
                actually gets used — not just bought.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease }}
            >
              <InsightsHeroGraphic />
            </motion.div>
          </div>
        </div>
      </section>

      {/* === FEATURED PERSPECTIVE === */}
      <section className="relative py-16 lg:py-20 overflow-hidden border-t border-white/[0.06]">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[220px] opacity-[0.03] pointer-events-none"
          style={{ backgroundColor: '#ffffff', top: '0%', right: '-10%' }}
        />
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="relative p-10 lg:p-14 border border-white/[0.08] bg-white/[0.02]">
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease }}
              />
              <p className="text-[11px] tracking-[0.3em] uppercase text-white/35 font-medium mb-7">
                {featured.category}
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-[-0.02em] leading-[1.12] mb-7 max-w-3xl">
                {featured.title}
              </h2>
              <p className="text-[16px] sm:text-[17px] text-white/50 leading-relaxed max-w-2xl">
                {featured.body}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* === PERSPECTIVE GRID === */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.03]">
            {perspectives.map((p, i) => (
              <FadeIn key={p.title} delay={0.08 + i * 0.06}>
                <article className="group h-full p-8 lg:p-10 bg-[#0d1117] hover:bg-white/[0.02] transition-colors duration-500">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-white/30 font-medium mb-5">
                    {p.category}
                  </p>
                  <h3 className="text-xl sm:text-[1.6rem] font-semibold text-white/90 tracking-[-0.01em] leading-[1.15] mb-5">
                    {p.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-white/45 leading-relaxed">
                    {p.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-14 text-center">
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-white/50 hover:text-white/80 transition-colors duration-300"
              >
                See how the practice works
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
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
