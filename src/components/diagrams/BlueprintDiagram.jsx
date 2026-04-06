import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/*
  "The Blueprint" — Purpose-Built Products visualization

  Dashed wireframe of a dashboard → lines solidify section by section →
  panels fill with subtle gradient → micro-elements animate inside
  (chart line, progress bars, numbers) → final glow = it's alive.

  Story: "We don't configure off-the-shelf. We engineer from scratch."
*/

const ease = [0.22, 1, 0.36, 1]

export default function BlueprintDiagram() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const phaseDelay = {
    wireframe: 0.3,
    solidify: 1.4,
    fill: 2.2,
    details: 2.8,
    live: 3.8,
  }

  return (
    <div ref={ref} className="w-full aspect-[4/3] max-w-lg mx-auto lg:mx-0">
      <svg
        viewBox="0 0 100 80"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="panelFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.04" />
            <stop offset="100%" stopColor="white" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0.15" />
          </linearGradient>
          <filter id="bpGlow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === OUTER FRAME === */}
        {/* Dashed outline → solid */}
        <motion.rect
          x="4" y="2" width="92" height="76" rx="2"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.4"
          strokeDasharray="3 2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: { duration: 1.5, delay: phaseDelay.wireframe, ease },
            opacity: { duration: 0.3, delay: phaseDelay.wireframe },
          }}
        />
        {/* Solid overlay */}
        <motion.rect
          x="4" y="2" width="92" height="76" rx="2"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: { duration: 1.2, delay: phaseDelay.solidify, ease },
            opacity: { duration: 0.3, delay: phaseDelay.solidify },
          }}
        />

        {/* === TOP BAR / HEADER === */}
        <motion.rect
          x="4" y="2" width="92" height="10" rx="2"
          fill="url(#panelFill)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.25"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: phaseDelay.fill }}
        />
        {/* Header elements — title bar lines */}
        <motion.rect x="8" y="5.5" width="14" height="1.5" rx="0.75" fill="rgba(255,255,255,0.25)"
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: phaseDelay.details, ease }}
          style={{ transformOrigin: '8px 5.5px' }}
        />
        <motion.rect x="8" y="8" width="8" height="1" rx="0.5" fill="rgba(255,255,255,0.1)"
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: phaseDelay.details + 0.08, ease }}
          style={{ transformOrigin: '8px 8px' }}
        />
        {/* Header nav dots */}
        {[80, 84, 88].map((cx, i) => (
          <motion.circle key={`nav-${i}`} cx={cx} cy="7" r="1"
            fill="rgba(255,255,255,0.12)"
            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: phaseDelay.details + 0.1 + i * 0.06, ease }}
            style={{ transformOrigin: `${cx}px 7px` }}
          />
        ))}

        {/* === LEFT SIDEBAR === */}
        <motion.rect
          x="4" y="12" width="20" height="66" rx="0"
          fill="url(#panelFill)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.25"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: phaseDelay.fill + 0.15 }}
        />
        {/* Sidebar menu items */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={`menu-${i}`}
            x="7" y={16 + i * 6} width={i === 0 ? 14 : 10 + Math.random() * 4}
            height="1.5" rx="0.75"
            fill={i === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: phaseDelay.details + 0.15 + i * 0.06, ease }}
            style={{ transformOrigin: `7px ${16 + i * 6}px` }}
          />
        ))}

        {/* === MAIN CONTENT — Top row: stats cards === */}
        {[0, 1, 2].map((i) => {
          const x = 27 + i * 23
          return (
            <g key={`stat-${i}`}>
              {/* Card bg */}
              <motion.rect
                x={x} y="14" width="20" height="14" rx="1"
                fill="url(#panelFill)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.25"
                initial={{ opacity: 0, y: 2 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: phaseDelay.fill + 0.3 + i * 0.12, ease }}
              />
              {/* Stat number */}
              <motion.rect
                x={x + 3} y="17" width="8" height="2.5" rx="0.5"
                fill="rgba(255,255,255,0.2)"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.4, delay: phaseDelay.details + 0.3 + i * 0.1, ease }}
                style={{ transformOrigin: `${x + 3}px 17px` }}
              />
              {/* Stat label */}
              <motion.rect
                x={x + 3} y="21" width="12" height="1" rx="0.5"
                fill="rgba(255,255,255,0.07)"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.4, delay: phaseDelay.details + 0.4 + i * 0.1, ease }}
                style={{ transformOrigin: `${x + 3}px 21px` }}
              />
              {/* Mini sparkline */}
              <motion.polyline
                points={
                  i === 0
                    ? `${x + 3},25 ${x + 6},24.5 ${x + 9},25.5 ${x + 12},23 ${x + 15},24`
                    : i === 1
                    ? `${x + 3},25.5 ${x + 6},24 ${x + 9},24.5 ${x + 12},23.5 ${x + 15},22`
                    : `${x + 3},24 ${x + 6},25 ${x + 9},23.5 ${x + 12},24.5 ${x + 15},23`
                }
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: phaseDelay.details + 0.5 + i * 0.1, ease }}
              />
            </g>
          )
        })}

        {/* === MAIN CONTENT — Chart area === */}
        <motion.rect
          x="27" y="31" width="43" height="28" rx="1"
          fill="url(#panelFill)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.25"
          initial={{ opacity: 0, y: 2 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: phaseDelay.fill + 0.5, ease }}
        />
        {/* Chart axes */}
        <motion.line
          x1="31" y1="35" x2="31" y2="55"
          stroke="rgba(255,255,255,0.1)" strokeWidth="0.3"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.4, delay: phaseDelay.details + 0.6, ease }}
        />
        <motion.line
          x1="31" y1="55" x2="66" y2="55"
          stroke="rgba(255,255,255,0.1)" strokeWidth="0.3"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.4, delay: phaseDelay.details + 0.65, ease }}
        />
        {/* Chart line — the hero moment */}
        <motion.polyline
          points="33,52 37,50 41,48 45,44 49,46 53,40 57,38 61,36 65,33"
          fill="none"
          stroke="url(#chartGrad)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#bpGlow)"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, delay: phaseDelay.details + 0.8, ease }}
        />
        {/* Chart area fill */}
        <motion.polygon
          points="33,52 37,50 41,48 45,44 49,46 53,40 57,38 61,36 65,33 65,55 33,55"
          fill="rgba(255,255,255,0.03)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: phaseDelay.details + 1.2 }}
        />

        {/* === RIGHT PANEL — Data table === */}
        <motion.rect
          x="73" y="31" width="23" height="28" rx="1"
          fill="url(#panelFill)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.25"
          initial={{ opacity: 0, y: 2 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: phaseDelay.fill + 0.6, ease }}
        />
        {/* Table rows */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.rect
            key={`row-${i}`}
            x="76" y={34 + i * 3.8} width={16 - (i % 2) * 3} height="1.2" rx="0.5"
            fill={i === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.3, delay: phaseDelay.details + 0.7 + i * 0.06, ease }}
            style={{ transformOrigin: `76px ${34 + i * 3.8}px` }}
          />
        ))}

        {/* === BOTTOM ROW — Progress bars === */}
        {[0, 1].map((i) => {
          const x = 27 + i * 35
          const barWidth = i === 0 ? 28 : 18
          return (
            <g key={`progress-${i}`}>
              <motion.rect
                x={x} y="62" width={i === 0 ? 31 : 35} height="14" rx="1"
                fill="url(#panelFill)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.25"
                initial={{ opacity: 0, y: 2 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: phaseDelay.fill + 0.7 + i * 0.1, ease }}
              />
              {/* Label */}
              <motion.rect
                x={x + 3} y="65" width="15" height="1.2" rx="0.5"
                fill="rgba(255,255,255,0.12)"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.3, delay: phaseDelay.details + 1.0 + i * 0.1, ease }}
                style={{ transformOrigin: `${x + 3}px 65px` }}
              />
              {/* Progress track */}
              <motion.rect
                x={x + 3} y="69" width={barWidth} height="2" rx="1"
                fill="rgba(255,255,255,0.06)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: phaseDelay.details + 1.1 + i * 0.1 }}
              />
              {/* Progress fill — animated */}
              <motion.rect
                x={x + 3} y="69" width={barWidth * (i === 0 ? 0.73 : 0.58)}
                height="2" rx="1"
                fill="rgba(255,255,255,0.25)"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: phaseDelay.details + 1.2 + i * 0.15, ease }}
                style={{ transformOrigin: `${x + 3}px 69px` }}
              />
            </g>
          )
        })}

        {/* === FINAL "LIVE" PULSE === */}
        {inView && (
          <motion.rect
            x="4" y="2" width="92" height="76" rx="2"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{
              duration: 2.5,
              delay: phaseDelay.live,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          />
        )}
      </svg>
    </div>
  )
}
