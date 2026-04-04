import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function PageHero({
  bgImage,
  label,
  headline,
  subtitle,
  accentColor,
  accentGradient,
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0d1117]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/30 to-[#0d1117]/50" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="inline-block text-[clamp(2rem,5vw,4.5rem)] tracking-[0.08em] uppercase font-bold"
            style={{
              background: accentGradient || accentColor,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {label}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-xl sm:text-2xl lg:text-4xl text-white/50 font-light tracking-[-0.01em]"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-[17px] leading-relaxed text-white/50 max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#features"
            className="group inline-flex items-center gap-2.5 bg-white text-[#0d1117] px-6 py-3 text-[13px] font-semibold hover:bg-white/90 transition-all duration-300"
          >
            Explore Capabilities
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/25">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} className="text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  )
}
