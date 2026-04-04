import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const taglines = [
  { lines: ['Academic', 'Operations'], gradient: 'linear-gradient(90deg, #D6A86E, #E8C590)', glow: 'rgba(214,168,110,0.25)' },
  { lines: ['Athletic', 'Operations'], gradient: 'linear-gradient(90deg, #5BC0EB, #6FD3FF)', glow: 'rgba(91,192,235,0.25)' },
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % taglines.length)
    }, 6500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/control_room_image_woman.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0d1117]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/40 to-[#0d1117]/60" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-[calc(5rem+12px)] pb-16">
        {/* Griffin mark — appears first, alone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 lg:mb-7"
        >
          <img
            src="/metvero_griffin_clean.png"
            alt=""
            className="h-20 sm:h-24 lg:h-28 w-auto mx-auto"
            style={{ filter: 'drop-shadow(0 0 14px rgba(255,255,255,0.12))', transform: 'translateX(clamp(-3px, -0.5vw, -7px))' }}
          />
        </motion.div>

        {/* Label — waits for griffin to land */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-[11px] tracking-[0.35em] uppercase text-white/40 font-medium">
            A Decision Layer for Modern Universities
          </span>
        </motion.div>

        {/* Headline — waits for label */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <h1 className="text-[clamp(1.4rem,4vw,3.8rem)] font-extralight leading-[0.95] tracking-[0.03em] text-white/60">
            The Future of
          </h1>
          <div className="h-[clamp(5.5rem,13vw,12rem)] relative overflow-hidden flex items-start justify-center pt-2">
            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.85] tracking-[0.015em]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  background: taglines[index].gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 30px ${taglines[index].glow}) drop-shadow(0 0 80px ${taglines[index].glow})`,
                }}
              >
                {taglines[index].lines[0]}<br />{taglines[index].lines[1]}
              </motion.h1>
            </AnimatePresence>
          </div>
          <motion.h1
            key={'aligned-' + index}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 2.5, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(1.4rem,4vw,3.8rem)] font-extralight leading-[1.1] tracking-[0.05em] mt-2 pb-2"
            style={{
              textShadow: '0 0 10px rgba(255,255,255,0.12)',
              transform: 'translateX(clamp(2px, 0.5vw, 8px)) translateY(-4px)',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            Aligned.
          </motion.h1>
        </motion.div>

        {/* Subtitle — waits for headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-[17px] leading-relaxed text-white/50 max-w-xl mx-auto"
        >
          Every system connected. Every path computed. Every decision informed.
        </motion.p>

        {/* CTAs — last to appear */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 3.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#athena"
            className="group inline-flex items-center gap-2.5 bg-white text-[#0d1117] px-6 py-3 text-[13px] font-semibold hover:bg-white/90 transition-all duration-300"
          >
            Enter Platform
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform duration-300"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 px-6 py-3 text-[13px] font-medium border border-white/[0.12] hover:border-white/[0.2] transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

    </section>
  )
}
