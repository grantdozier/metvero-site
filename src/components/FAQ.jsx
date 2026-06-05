import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import FadeIn from './FadeIn'

export default function FAQ({
  items = [],
  eyebrow = 'Questions',
  title = 'What teams ask first.',
  accentColor = '#ffffff',
}) {
  const [open, setOpen] = useState(null)

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 lg:mb-16">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-medium mb-6">
              {eyebrow}
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-[-0.02em] leading-[1.1]">
              {title}
            </h2>
          </FadeIn>
        </div>

        <div className="border-t border-white/[0.06]">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <FadeIn key={i} delay={0.05 + i * 0.04}>
                <div className="border-b border-white/[0.06]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group w-full flex items-start justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`text-[16px] sm:text-[17px] leading-snug transition-colors duration-300 ${
                        isOpen ? 'text-white/90' : 'text-white/65 group-hover:text-white/85'
                      }`}
                    >
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="shrink-0 mt-0.5"
                      style={{ color: isOpen ? accentColor : 'rgba(255,255,255,0.4)' }}
                    >
                      <Plus size={18} strokeWidth={1.5} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[14px] sm:text-[15px] text-white/45 leading-relaxed pb-6 max-w-2xl">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
