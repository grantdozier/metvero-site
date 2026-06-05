import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Milestones that light up along the rising path
const NODES = [
  { x: 152, y: 243, c: '#D6A86E', delay: 1.05 },
  { x: 210, y: 176, c: '#E8C590', delay: 1.25 },
  { x: 258, y: 128, c: '#6FD3FF', delay: 1.45 },
]

// Burst rays at the summit
const RAYS = [
  [300, 66], [282, 72], [318, 74], [280, 92], [320, 94],
]

export default function InsightsHeroGraphic() {
  return (
    <div className="relative w-full max-w-[440px] mx-auto">
      <div
        className="absolute inset-0 blur-[90px] opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 70% 30%, #D6A86E, #5BC0EB 55%, transparent 75%)' }}
      />

      <svg viewBox="0 0 360 380" className="relative w-full h-auto" fill="none">
        <defs>
          <linearGradient id="riseGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#D6A86E" />
            <stop offset="100%" stopColor="#5BC0EB" />
          </linearGradient>
        </defs>

        {/* The system the action springs from */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, ease }}>
          <rect x="36" y="266" width="78" height="54" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
          {/* highlighted signal row */}
          <rect x="44" y="276" width="62" height="8" rx="4" fill="rgba(214,168,110,0.45)" />
          <rect x="44" y="291" width="50" height="6" rx="3" fill="rgba(255,255,255,0.10)" />
          <rect x="44" y="303" width="56" height="6" rx="3" fill="rgba(255,255,255,0.10)" />
        </motion.g>

        {/* Soft lift-off glow at the origin */}
        <motion.circle
          cx="110" cy="278" r="16" fill="rgba(214,168,110,0.18)"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0.3] }}
          transition={{ duration: 1, delay: 0.6, ease }} style={{ filter: 'blur(6px)' }}
        />

        {/* The rising path — action lifting off and moving forward */}
        <motion.path
          d="M108 278 C 165 252, 176 150, 300 86"
          stroke="url(#riseGrad)" strokeWidth="2.6" strokeLinecap="round" fill="none"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.3, delay: 0.5, ease }}
        />

        {/* Milestones */}
        {NODES.map((n, i) => (
          <motion.circle
            key={i} cx={n.x} cy={n.y} r="4" fill={n.c}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: n.delay, ease }}
          />
        ))}

        {/* Summit — arrowhead + burst */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.6, ease }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <motion.circle
            cx="300" cy="86" r="22" fill="rgba(255,255,255,0.12)"
            animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.12, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'blur(6px)', transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          {/* burst rays */}
          {RAYS.map((r, i) => (
            <motion.line
              key={i} x1="300" y1="86" x2={r[0]} y2={r[1]}
              stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
            />
          ))}
          {/* arrowhead pointing forward/up */}
          <path d="M286 88 L300 84 L298 99" stroke="#5BC0EB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="300" cy="86" r="5" fill="#5BC0EB" />
        </motion.g>
      </svg>
    </div>
  )
}
