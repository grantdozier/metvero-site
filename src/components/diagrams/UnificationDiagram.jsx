import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/*
  "The Unification" — Systems Integration visualization

  Eight system blocks arranged around a central METVERO hub.
  Connections run both to the hub AND between neighboring systems.
  Data particles flow along all paths — a living, breathing network.

  Story: "Your tools are islands. We build the bridges."
*/

const ease = [0.22, 1, 0.36, 1]

// System blocks — 8 nodes arranged around the hub
const systems = [
  { id: 'A',  label: 'System A',  x: 4,  y: 4,   w: 16, h: 10, startX: -2, startY: -2 },
  { id: 'B',  label: 'System B',  x: 42, y: 2,   w: 16, h: 10, startX: 42, startY: -4 },
  { id: 'C',  label: 'System C',  x: 80, y: 4,   w: 16, h: 10, startX: 86, startY: -2 },
  { id: 'D',  label: 'System D',  x: 82, y: 45,  w: 16, h: 10, startX: 90, startY: 45 },
  { id: 'E',  label: 'System E',  x: 80, y: 86,  w: 16, h: 10, startX: 86, startY: 92 },
  { id: 'F',  label: 'System F',  x: 42, y: 88,  w: 16, h: 10, startX: 42, startY: 94 },
  { id: 'G',  label: 'System G',  x: 4,  y: 86,  w: 16, h: 10, startX: -2, startY: 92 },
  { id: 'H',  label: 'System H',  x: 2,  y: 45,  w: 16, h: 10, startX: -6, startY: 45 },
]

// Central hub
const hub = { x: 35, y: 40, w: 30, h: 20 }
const hcx = hub.x + hub.w / 2  // 50
const hcy = hub.y + hub.h / 2  // 50

// Helper: get the closest edge point of a rect toward a target point
function edgePoint(rect, tx, ty) {
  const cx = rect.x + rect.w / 2
  const cy = rect.y + rect.h / 2
  const dx = tx - cx
  const dy = ty - cy
  const angle = Math.atan2(dy, dx)

  // Check which edge the angle hits
  const hw = rect.w / 2
  const hh = rect.h / 2
  const tanA = Math.abs(Math.tan(angle))

  let ex, ey
  if (tanA <= hh / hw) {
    // Hits left or right edge
    ex = cx + (dx > 0 ? hw : -hw)
    ey = cy + (dx > 0 ? hw : -hw) * Math.tan(angle)
  } else {
    // Hits top or bottom edge
    ey = cy + (dy > 0 ? hh : -hh)
    ex = cx + (dy > 0 ? hh : -hh) / Math.tan(angle)
  }
  return { x: Math.round(ex * 10) / 10, y: Math.round(ey * 10) / 10 }
}

// Build connections: each outer system → hub
const hubConns = systems.map((sys) => {
  const scx = sys.x + sys.w / 2
  const scy = sys.y + sys.h / 2
  const from = edgePoint(sys, hcx, hcy)
  const to = edgePoint(hub, scx, scy)
  // Control point — offset perpendicular for a slight curve
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const off = len * 0.12
  const cpx = mx + (dy / len) * off
  const cpy = my - (dx / len) * off

  return {
    id: `${sys.id}-hub`,
    path: `M${from.x},${from.y} Q${cpx.toFixed(1)},${cpy.toFixed(1)} ${to.x},${to.y}`,
    points: [
      { cx: from.x, cy: from.y },
      { cx: (from.x + cpx) / 2, cy: (from.y + cpy) / 2 },
      { cx: cpx, cy: cpy },
      { cx: (cpx + to.x) / 2, cy: (cpy + to.y) / 2 },
      { cx: to.x, cy: to.y },
    ],
    primary: true,
  }
})

// Cross-connections between neighboring outer systems
const crossPairs = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [0, 3], [2, 5],  // diagonal shortcuts
]

const crossConns = crossPairs.map(([ai, bi]) => {
  const a = systems[ai]
  const b = systems[bi]
  const acx = a.x + a.w / 2
  const acy = a.y + a.h / 2
  const bcx = b.x + b.w / 2
  const bcy = b.y + b.h / 2
  const from = edgePoint(a, bcx, bcy)
  const to = edgePoint(b, acx, acy)

  return {
    id: `${a.id}-${b.id}`,
    path: `M${from.x},${from.y} L${to.x},${to.y}`,
    points: [
      { cx: from.x, cy: from.y },
      { cx: (from.x + to.x) / 2, cy: (from.y + to.y) / 2 },
      { cx: to.x, cy: to.y },
    ],
    primary: false,
  }
})

const allConnections = [...crossConns, ...hubConns]

function FlowingParticle({ points, delay, inView, reverse, r = 0.8 }) {
  if (!inView) return null
  const pts = reverse ? [...points].reverse() : points
  const opacityKeys = new Array(pts.length).fill(0.8)
  opacityKeys[0] = 0
  opacityKeys[pts.length - 1] = 0

  return (
    <motion.circle
      r={r}
      fill="rgba(255,255,255,0.8)"
      initial={{ opacity: 0 }}
      animate={{
        cx: pts.map((p) => p.cx),
        cy: pts.map((p) => p.cy),
        opacity: opacityKeys,
      }}
      transition={{
        duration: pts.length > 3 ? 2.5 : 1.8,
        delay,
        repeat: Infinity,
        repeatDelay: 2.5,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function UnificationDiagram() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="w-full aspect-square max-w-lg mx-auto lg:mx-0">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="unifyGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- All connection paths (behind everything) --- */}
        {allConnections.map((conn, i) => (
          <g key={conn.id}>
            <motion.path
              d={conn.path}
              fill="none"
              stroke={conn.primary ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}
              strokeWidth={conn.primary ? 0.35 : 0.25}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{
                pathLength: { duration: 1, delay: conn.primary ? 1.6 + i * 0.08 : 2.4 + i * 0.06, ease },
                opacity: { duration: 0.3, delay: conn.primary ? 1.6 + i * 0.08 : 2.4 + i * 0.06 },
              }}
            />
            {/* Particles on hub connections */}
            {conn.primary && (
              <>
                <FlowingParticle
                  points={conn.points}
                  delay={3.0 + i * 0.35}
                  inView={inView}
                  reverse={false}
                />
                <FlowingParticle
                  points={conn.points}
                  delay={4.2 + i * 0.35}
                  inView={inView}
                  reverse={true}
                />
              </>
            )}
            {/* Occasional particles on cross connections */}
            {!conn.primary && i % 3 === 0 && (
              <FlowingParticle
                points={conn.points}
                delay={3.5 + i * 0.4}
                inView={inView}
                reverse={false}
                r={0.6}
              />
            )}
          </g>
        ))}

        {/* --- System blocks --- */}
        {systems.map((sys, i) => (
          <motion.g
            key={sys.id}
            initial={{
              x: sys.startX - sys.x,
              y: sys.startY - sys.y,
              opacity: 0,
            }}
            animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease }}
          >
            <rect
              x={sys.x}
              y={sys.y}
              width={sys.w}
              height={sys.h}
              rx="1.5"
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.3"
            />
            <text
              x={sys.x + sys.w / 2}
              y={sys.y + sys.h / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fill="rgba(255,255,255,0.45)"
              fontSize="3.5"
              fontFamily="'Inter', sans-serif"
              fontWeight="600"
              letterSpacing="0.1em"
            >
              {sys.label}
            </text>
          </motion.g>
        ))}

        {/* --- Central METVERO hub --- */}
        <motion.g
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6, ease }}
          style={{ transformOrigin: `${hcx}px ${hcy}px` }}
        >
          <rect
            x={hub.x}
            y={hub.y}
            width={hub.w}
            height={hub.h}
            rx="2"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
            filter="url(#unifyGlow)"
          />
          <text
            x={hcx}
            y={hcy - 1}
            textAnchor="middle"
            dominantBaseline="central"
            fill="rgba(255,255,255,0.75)"
            fontSize="3.8"
            fontFamily="'Inter', sans-serif"
            fontWeight="700"
            letterSpacing="0.18em"
          >
            METVERO
          </text>
          <text
            x={hcx}
            y={hcy + 4}
            textAnchor="middle"
            dominantBaseline="central"
            fill="rgba(255,255,255,0.25)"
            fontSize="2.2"
            fontFamily="'Inter', sans-serif"
            fontWeight="400"
            letterSpacing="0.15em"
          >
            UNIFIED
          </text>
        </motion.g>

        {/* Hub pulse */}
        {inView && (
          <motion.rect
            x={hub.x}
            y={hub.y}
            width={hub.w}
            height={hub.h}
            rx="2"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.5"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{
              duration: 2.5,
              delay: 4,
              repeat: Infinity,
              repeatDelay: 3.5,
            }}
          />
        )}
      </svg>
    </div>
  )
}
