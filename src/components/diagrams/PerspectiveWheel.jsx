import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/*
  "The Perspective Wheel"

  Roles arranged in a ring, connected like spokes to a center hub.
  As each role fades in, a radial pie-slice section behind it lights up.
  The wheel completes = the full picture. Incomplete = incomplete system.
*/

const ease = [0.22, 1, 0.36, 1]

const roles = [
  'Executive',
  'Director',
  'Manager',
  'Team Lead',
  'Engineer',
  'Analyst',
  'Specialist',
  'Coordinator',
  'Operator',
  'Admin',
  'New Hire',
  'End User',
]

const cx = 50
const cy = 50
const outerR = 42
const labelR = 42
const spokeInner = 14
const spokeOuter = 30
const segmentCount = roles.length
const sliceAngle = (2 * Math.PI) / segmentCount

// Build arc path for a pie slice
function arcSlicePath(index, innerR, outerR_) {
  const startAngle = index * sliceAngle - Math.PI / 2 - sliceAngle / 2
  const endAngle = startAngle + sliceAngle
  const gap = 0.02 // tiny gap between slices

  const x1o = cx + Math.cos(startAngle + gap) * outerR_
  const y1o = cy + Math.sin(startAngle + gap) * outerR_
  const x2o = cx + Math.cos(endAngle - gap) * outerR_
  const y2o = cy + Math.sin(endAngle - gap) * outerR_
  const x1i = cx + Math.cos(endAngle - gap) * innerR
  const y1i = cy + Math.sin(endAngle - gap) * innerR
  const x2i = cx + Math.cos(startAngle + gap) * innerR
  const y2i = cy + Math.sin(startAngle + gap) * innerR

  return `M${x1o},${y1o} A${outerR_},${outerR_} 0 0,1 ${x2o},${y2o} L${x1i},${y1i} A${innerR},${innerR} 0 0,0 ${x2i},${y2i} Z`
}

export default function PerspectiveWheel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="w-full max-w-md mx-auto aspect-square">
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ overflow: 'visible' }}>
        <defs>
          <filter id="wheelGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- Pie slices (behind everything) --- */}
        {roles.map((_, i) => {
          const path = arcSlicePath(i, spokeInner + 2, spokeOuter + 2)
          return (
            <motion.path
              key={`slice-${i}`}
              d={path}
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.12, ease }}
            />
          )
        })}

        {/* --- Spokes from center to each role --- */}
        {roles.map((_, i) => {
          const angle = (i * sliceAngle) - Math.PI / 2
          const x1 = cx + Math.cos(angle) * spokeInner
          const y1 = cy + Math.sin(angle) * spokeInner
          const x2 = cx + Math.cos(angle) * spokeOuter
          const y2 = cy + Math.sin(angle) * spokeOuter

          return (
            <motion.line
              key={`spoke-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{
                pathLength: { duration: 0.6, delay: 0.6 + i * 0.1, ease },
                opacity: { duration: 0.2, delay: 0.6 + i * 0.1 },
              }}
            />
          )
        })}

        {/* --- Outer ring (draws as wheel completes) --- */}
        <motion.circle
          cx={cx} cy={cy} r={spokeOuter + 2}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: { duration: 2, delay: 0.5, ease },
            opacity: { duration: 0.3, delay: 0.5 },
          }}
        />

        {/* --- Inner ring --- */}
        <motion.circle
          cx={cx} cy={cy} r={spokeInner}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            pathLength: { duration: 1.5, delay: 0.3, ease },
            opacity: { duration: 0.3, delay: 0.3 },
          }}
        />

        {/* --- Role labels + node dots --- */}
        {roles.map((role, i) => {
          const angle = (i * sliceAngle) - Math.PI / 2
          const nx = cx + Math.cos(angle) * spokeOuter
          const ny = cy + Math.sin(angle) * spokeOuter
          const lx = cx + Math.cos(angle) * labelR
          const ly = cy + Math.sin(angle) * labelR

          // Determine text anchor based on position
          const isLeft = lx < cx - 5
          const isRight = lx > cx + 5
          const anchor = isLeft ? 'end' : isRight ? 'start' : 'middle'

          // Offset label away from the node
          const labelOffX = isLeft ? -3 : isRight ? 3 : 0
          const labelOffY = ly < cy - 5 ? -3.5 : ly > cy + 5 ? 4.5 : 0.5

          return (
            <g key={`role-${i}`}>
              {/* Node dot on the ring */}
              <motion.circle
                cx={nx} cy={ny} r="1.4"
                fill="rgba(255,255,255,0.6)"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.12, ease }}
                style={{ transformOrigin: `${nx}px ${ny}px` }}
              />

              {/* Role label */}
              <motion.text
                x={lx + labelOffX}
                y={ly + labelOffY}
                textAnchor={anchor}
                dominantBaseline="central"
                fill="rgba(255,255,255,0.5)"
                fontSize="2.8"
                fontFamily="'Inter', sans-serif"
                fontWeight="500"
                letterSpacing="0.04em"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.0 + i * 0.12, ease }}
              >
                {role}
              </motion.text>
            </g>
          )
        })}

        {/* --- Center hub --- */}
        <motion.circle
          cx={cx} cy={cy} r={spokeInner - 1}
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.4"
          filter="url(#wheelGlow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Griffin logo in center */}
        <motion.image
          href="/metvero_griffin_clean.png"
          x={cx - 7}
          y={cy - 7}
          width="14"
          height="14"
          opacity="0.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 0.5, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* --- Completion pulse (fires after all roles are in) --- */}
        {inView && (
          <motion.circle
            cx={cx} cy={cy} r={spokeOuter + 2}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{
              duration: 2,
              delay: 3,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          />
        )}
      </svg>
    </div>
  )
}
