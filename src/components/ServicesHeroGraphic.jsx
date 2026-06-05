import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Faint engagement nodes around the clasp
const NODES = [
  [62, 72], [300, 66], [44, 206], [318, 214], [180, 38],
]

// Alignment burst at the clasp
const SPARK = [
  [180, 150], [152, 160], [208, 160], [146, 192], [214, 192],
]

// Particles streaming up each arm into the clasp
const LEFT_PARTICLES = [0, 1, 2]
const RIGHT_PARTICLES = [0, 1, 2]

export default function ServicesHeroGraphic() {
  return (
    <div className="relative w-full max-w-[440px] mx-auto">
      <div
        className="absolute inset-0 blur-[90px] opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, #D6A86E, #5BC0EB 60%, transparent 75%)' }}
      />

      <svg viewBox="0 0 360 380" className="relative w-full h-auto" fill="none">
        <defs>
          <linearGradient id="armGold" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(214,168,110,0.25)" />
            <stop offset="100%" stopColor="#D6A86E" />
          </linearGradient>
          <linearGradient id="armBlue" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(91,192,235,0.25)" />
            <stop offset="100%" stopColor="#5BC0EB" />
          </linearGradient>
          <radialGradient id="claspCore" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Engagement nodes */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2, ease }}>
          {NODES.map((n, i) => (
            <g key={`n-${i}`}>
              <line x1={n[0]} y1={n[1]} x2="180" y2="198" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" />
              <circle cx={n[0]} cy={n[1]} r="2.4" fill="rgba(255,255,255,0.28)" />
            </g>
          ))}
        </motion.g>

        {/* Arms */}
        <motion.line
          x1="50" y1="330" x2="164" y2="212" stroke="url(#armGold)" strokeWidth="16" strokeLinecap="round"
          initial={{ opacity: 0, x: -36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.4, ease }}
        />
        <motion.line
          x1="310" y1="330" x2="196" y2="212" stroke="url(#armBlue)" strokeWidth="16" strokeLinecap="round"
          initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.4, ease }}
        />

        {/* Data particles flowing toward the clasp */}
        {LEFT_PARTICLES.map((p) => (
          <motion.circle
            key={`lp-${p}`} r="2.6" fill="#D6A86E"
            initial={{ opacity: 0 }}
            animate={{ cx: [64, 160], cy: [318, 216], opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeIn', delay: 1.4 + p * 0.5 }}
          />
        ))}
        {RIGHT_PARTICLES.map((p) => (
          <motion.circle
            key={`rp-${p}`} r="2.6" fill="#5BC0EB"
            initial={{ opacity: 0 }}
            animate={{ cx: [296, 200], cy: [318, 216], opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeIn', delay: 1.65 + p * 0.5 }}
          />
        ))}

        {/* The clasp — two interlocking hands */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial={{ opacity: 0, scale: 0.55 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.2, ease }}
        >
          {/* halo */}
          <motion.circle
            cx="180" cy="200" r="40" fill="url(#claspCore)"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          {/* left hand (gold) */}
          <g transform="rotate(-16 180 200)">
            <rect x="142" y="187" width="42" height="26" rx="9" fill="rgba(214,168,110,0.10)" stroke="rgba(214,168,110,0.8)" strokeWidth="1.4" />
            <line x1="150" y1="194" x2="178" y2="194" stroke="rgba(214,168,110,0.55)" strokeWidth="1.1" />
            <line x1="150" y1="200" x2="178" y2="200" stroke="rgba(214,168,110,0.55)" strokeWidth="1.1" />
            <line x1="150" y1="206" x2="178" y2="206" stroke="rgba(214,168,110,0.55)" strokeWidth="1.1" />
          </g>
          {/* right hand (blue) */}
          <g transform="rotate(16 180 200)">
            <rect x="176" y="187" width="42" height="26" rx="9" fill="rgba(91,192,235,0.10)" stroke="rgba(91,192,235,0.8)" strokeWidth="1.4" />
            <line x1="182" y1="194" x2="210" y2="194" stroke="rgba(91,192,235,0.55)" strokeWidth="1.1" />
            <line x1="182" y1="200" x2="210" y2="200" stroke="rgba(91,192,235,0.55)" strokeWidth="1.1" />
            <line x1="182" y1="206" x2="210" y2="206" stroke="rgba(91,192,235,0.55)" strokeWidth="1.1" />
          </g>
          {/* bright junction */}
          <circle cx="180" cy="200" r="5" fill="rgba(255,255,255,0.95)" />
        </motion.g>

        {/* Alignment burst */}
        {SPARK.map((s, i) => (
          <motion.line
            key={`s-${i}`} x1="180" y1="200" x2={s[0]} y2={s[1]}
            stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" strokeLinecap="round"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: [0, 0.9, 0.3], pathLength: 1 }}
            transition={{ duration: 0.6, delay: 1.5 + i * 0.05, ease }}
          />
        ))}
      </svg>
    </div>
  )
}
