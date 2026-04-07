import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/*
  "How We Work" — Engagement process visualization

  Four phases: Discover → Architect → Build → Evolve
  Each phase has a micro-animation icon.
  Connected by an animated progress line.
  Horizontal on desktop, vertical on mobile.
*/

const ease = [0.22, 1, 0.36, 1]

const phases = [
  {
    label: 'Discover',
    desc: 'Map your landscape, surface the real problems, and identify where AI can move the needle.',
  },
  {
    label: 'Architect',
    desc: 'Design the technical strategy, data flows, and system architecture from the ground up.',
  },
  {
    label: 'Build',
    desc: 'Engineer the solution — embedded with your team, shipping iteratively, testing with real users.',
  },
  {
    label: 'Evolve',
    desc: 'Deploy, monitor, and continuously improve. The system gets smarter as your institution grows.',
  },
]

/* ---- Micro-animation icons for each phase ---- */

function DiscoverIcon({ inView, delay }) {
  // Compass with rotating needle, centered at 20,20
  return (
    <svg viewBox="0 0 40 40" className="w-full h-full">
      {/* Concentric rings — centered at 20,20 */}
      {[14, 10, 6].map((r, i) => (
        <motion.circle
          key={i}
          cx="20" cy="20" r={r}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + i * 0.12, ease }}
          style={{ transformOrigin: '20px 20px' }}
        />
      ))}
      {/* Cardinal tick marks */}
      {[
        { x1: 20, y1: 5, x2: 20, y2: 7 },   // N
        { x1: 35, y1: 20, x2: 33, y2: 20 },  // E
        { x1: 20, y1: 35, x2: 20, y2: 33 },  // S
        { x1: 5, y1: 20, x2: 7, y2: 20 },    // W
      ].map((tick, i) => (
        <motion.line
          key={`tick-${i}`}
          x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: delay + 0.3 + i * 0.05 }}
        />
      ))}
      {/* Compass needle — two halves from center, rotating */}
      {inView && (
        <g style={{ transformOrigin: '20px 20px' }}>
          <motion.g
            initial={{ rotate: -30 }}
            animate={{ rotate: 330 }}
            transition={{
              duration: 4,
              delay: delay + 0.4,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ transformOrigin: '20px 20px' }}
          >
            {/* Needle north half (bright) */}
            <line
              x1="20" y1="20" x2="20" y2="8"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            {/* Needle south half (dim) */}
            <line
              x1="20" y1="20" x2="20" y2="32"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
          </motion.g>
        </g>
      )}
      {/* Center pivot dot */}
      <motion.circle
        cx="20" cy="20" r="1.5"
        fill="rgba(255,255,255,0.7)"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.5, ease }}
        style={{ transformOrigin: '20px 20px' }}
      />
      {/* Discovered points on the outer ring */}
      {[
        { cx: 27, cy: 10 },
        { cx: 10, cy: 17 },
        { cx: 29, cy: 27 },
        { cx: 13, cy: 30 },
      ].map((pt, i) => (
        <motion.circle
          key={`pt-${i}`}
          cx={pt.cx} cy={pt.cy} r="1.2"
          fill="rgba(255,255,255,0.6)"
          initial={{ scale: 0 }}
          animate={inView ? { scale: [0, 1.3, 1] } : {}}
          transition={{ duration: 0.4, delay: delay + 1.0 + i * 0.3, ease }}
          style={{ transformOrigin: `${pt.cx}px ${pt.cy}px` }}
        />
      ))}
    </svg>
  )
}

function ArchitectIcon({ inView, delay }) {
  // Structure forming — lines connecting into a framework
  const lines = [
    { x1: 8, y1: 32, x2: 20, y2: 10 },
    { x1: 20, y1: 10, x2: 32, y2: 32 },
    { x1: 8, y1: 32, x2: 32, y2: 32 },
    { x1: 14, y1: 21, x2: 26, y2: 21 },
    { x1: 20, y1: 10, x2: 20, y2: 32 },
  ]

  return (
    <svg viewBox="0 0 40 40" className="w-full h-full">
      {lines.map((l, i) => (
        <motion.line
          key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: { duration: 0.6, delay: delay + 0.3 + i * 0.15, ease },
            opacity: { duration: 0.2, delay: delay + 0.3 + i * 0.15 },
          }}
        />
      ))}
      {/* Junction nodes */}
      {[
        { cx: 20, cy: 10 },
        { cx: 8, cy: 32 },
        { cx: 32, cy: 32 },
        { cx: 14, cy: 21 },
        { cx: 26, cy: 21 },
        { cx: 20, cy: 32 },
      ].map((n, i) => (
        <motion.circle
          key={`jn-${i}`}
          cx={n.cx} cy={n.cy} r="1.5"
          fill="rgba(255,255,255,0.5)"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: delay + 0.8 + i * 0.08, ease }}
          style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
        />
      ))}
    </svg>
  )
}

function BuildIcon({ inView, delay }) {
  // Blocks filling in — construction
  const blocks = [
    { x: 8, y: 24, w: 10, h: 10 },
    { x: 22, y: 24, w: 10, h: 10 },
    { x: 22, y: 10, w: 10, h: 10 },
    { x: 8, y: 10, w: 10, h: 10 },
  ]

  return (
    <svg viewBox="0 0 40 40" className="w-full h-full">
      {blocks.map((b, i) => (
        <g key={`bl-${i}`}>
          {/* Dashed outline */}
          <motion.rect
            x={b.x} y={b.y} width={b.w} height={b.h} rx="1"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.5"
            strokeDasharray="2 1.5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: delay + 0.2 + i * 0.1 }}
          />
          {/* Solid fill */}
          <motion.rect
            x={b.x} y={b.y} width={b.w} height={b.h} rx="1"
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.4"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.7 + i * 0.15, ease }}
            style={{ transformOrigin: `${b.x + b.w / 2}px ${b.y + b.h / 2}px` }}
          />
        </g>
      ))}
      {/* Assembly line — connecting line between blocks */}
      <motion.polyline
        points="13,29 13,15 27,15 27,29"
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.4"
        strokeDasharray="1.5 1"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1, delay: delay + 1.5, ease }}
      />
    </svg>
  )
}

function EvolveIcon({ inView, delay }) {
  // Growing tree — trunk splits into branches that keep reaching upward
  const branches = [
    // Main trunk
    { d: 'M20,37 L20,20', stroke: 0.35, width: 0.8, delay: 0.3, dur: 0.8 },
    // Primary branches (from trunk)
    { d: 'M20,26 Q15,22 11,16', stroke: 0.28, width: 0.65, delay: 0.9, dur: 0.6 },
    { d: 'M20,23 Q25,19 29,13', stroke: 0.28, width: 0.65, delay: 1.0, dur: 0.6 },
    { d: 'M20,20 Q18,16 17,10', stroke: 0.22, width: 0.55, delay: 1.1, dur: 0.5 },
    // Secondary branches (from primary)
    { d: 'M11,16 Q8,12 6,8', stroke: 0.18, width: 0.45, delay: 1.3, dur: 0.4 },
    { d: 'M11,16 Q13,12 15,7', stroke: 0.18, width: 0.45, delay: 1.35, dur: 0.4 },
    { d: 'M29,13 Q31,9 33,5', stroke: 0.18, width: 0.45, delay: 1.4, dur: 0.4 },
    { d: 'M29,13 Q27,9 25,5', stroke: 0.18, width: 0.45, delay: 1.42, dur: 0.4 },
    { d: 'M17,10 Q14,7 12,4', stroke: 0.15, width: 0.4, delay: 1.45, dur: 0.4 },
    { d: 'M17,10 Q19,6 20,3', stroke: 0.15, width: 0.4, delay: 1.48, dur: 0.4 },
    // Tertiary wisps (finest, reaching highest)
    { d: 'M6,8 Q5,5 4,3', stroke: 0.12, width: 0.3, delay: 1.55, dur: 0.35 },
    { d: 'M15,7 Q16,4 17,2', stroke: 0.12, width: 0.3, delay: 1.58, dur: 0.35 },
    { d: 'M33,5 Q34,3 35,1', stroke: 0.12, width: 0.3, delay: 1.6, dur: 0.35 },
    { d: 'M25,5 Q24,3 23,1', stroke: 0.12, width: 0.3, delay: 1.62, dur: 0.35 },
  ]

  const leaves = [
    { cx: 4, cy: 3 },
    { cx: 12, cy: 4 },
    { cx: 17, cy: 2 },
    { cx: 20, cy: 3 },
    { cx: 23, cy: 1 },
    { cx: 25, cy: 5 },
    { cx: 33, cy: 5 },
    { cx: 35, cy: 1 },
    { cx: 6, cy: 8 },
    { cx: 15, cy: 7 },
  ]

  const pulseLeaves = [
    { cx: 4, cy: 3 },
    { cx: 20, cy: 3 },
    { cx: 35, cy: 1 },
    { cx: 12, cy: 4 },
  ]

  return (
    <svg viewBox="0 0 40 40" className="w-full h-full">
      {/* Branches */}
      {branches.map((b, i) => (
        <motion.path
          key={`br-${i}`}
          d={b.d}
          fill="none"
          stroke={`rgba(255,255,255,${b.stroke})`}
          strokeWidth={b.width}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: b.dur, delay: delay + b.delay, ease }}
        />
      ))}
      {/* Leaf nodes */}
      {leaves.map((n, i) => (
        <motion.circle
          key={`leaf-${i}`}
          cx={n.cx} cy={n.cy} r="1.5"
          fill="rgba(255,255,255,0.5)"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 1.6 + i * 0.05, ease }}
          style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
        />
      ))}
      {/* Pulse on select leaves */}
      {inView && pulseLeaves.map((n, i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx={n.cx} cy={n.cy} r="1.5"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.4"
          animate={{
            r: [1.5, 4, 4],
            opacity: [0.4, 0.1, 0],
          }}
          transition={{
            duration: 2,
            delay: delay + 2.0 + i * 0.5,
            repeat: Infinity,
            repeatDelay: 2.5,
          }}
        />
      ))}
      {/* Root base */}
      <motion.circle
        cx="20" cy="37" r="1.2"
        fill="rgba(255,255,255,0.25)"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.2, ease }}
        style={{ transformOrigin: '20px 37px' }}
      />
    </svg>
  )
}

const iconComponents = [DiscoverIcon, ArchitectIcon, BuildIcon, EvolveIcon]

export default function ProcessTimeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto px-6 lg:px-8">
      {/* Desktop: horizontal layout */}
      <div className="hidden md:block">
        <div className="relative flex items-start justify-between mb-0">
          {phases.map((phase, i) => {
            const Icon = iconComponents[i]
            const isLast = i === phases.length - 1
            return (
              <div
                key={phase.label}
                className="relative flex items-start"
                style={{ width: '25%' }}
              >
                {/* Phase content */}
                <motion.div
                  className="flex flex-col items-center text-center w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.18, ease }}
                >
                  {/* Phase number */}
                  <span className="text-[10px] tracking-[0.25em] text-white/20 font-medium mb-3">
                    0{i + 1}
                  </span>

                  {/* Icon container */}
                  <div className="w-[72px] h-[72px] rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center mb-5">
                    <div className="w-[44px] h-[44px]">
                      <Icon inView={inView} delay={0.6 + i * 0.3} />
                    </div>
                  </div>

                  {/* Label */}
                  <h4 className="text-[15px] font-semibold text-white/85 tracking-[-0.01em] mb-2">
                    {phase.label}
                  </h4>

                  {/* Description */}
                  <p className="text-[13px] text-white/35 leading-relaxed max-w-[200px]">
                    {phase.desc}
                  </p>
                </motion.div>

                {/* Arrow between phases */}
                {!isLast && (
                  <motion.div
                    className="absolute right-0 translate-x-1/2 top-[54px] z-10"
                    initial={{ opacity: 0, x: -4 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.2, ease }}
                    style={{ transform: 'translateX(50%)' }}
                  >
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                      <path
                        d="M1 6h14M12 2l4 4-4 4"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile: vertical layout */}
      <div className="md:hidden">
        <div className="space-y-2">
          {phases.map((phase, i) => {
            const Icon = iconComponents[i]
            const isLast = i === phases.length - 1
            return (
              <div key={phase.label}>
                <motion.div
                  className="flex items-start gap-5"
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.18, ease }}
                >
                  {/* Icon container */}
                  <div className="w-[56px] h-[56px] rounded-xl border border-white/[0.08] bg-[#0d1117] flex items-center justify-center shrink-0">
                    <div className="w-[36px] h-[36px]">
                      <Icon inView={inView} delay={0.6 + i * 0.3} />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="pt-1">
                    <span className="text-[10px] tracking-[0.25em] text-white/20 font-medium">
                      0{i + 1}
                    </span>
                    <h4 className="text-[15px] font-semibold text-white/85 tracking-[-0.01em] mt-1 mb-1.5">
                      {phase.label}
                    </h4>
                    <p className="text-[13px] text-white/35 leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>
                </motion.div>

                {/* Down arrow between phases */}
                {!isLast && (
                  <motion.div
                    className="flex justify-center py-3 pl-[56px]"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + i * 0.2 }}
                  >
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                      <path
                        d="M6 1v14M2 12l4 4 4-4"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
