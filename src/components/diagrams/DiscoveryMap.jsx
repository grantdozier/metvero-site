import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/*
  "The Discovery Map" — AI Strategy & Advisory visualization

  Scattered data points → scanning line reveals structure →
  connections draw between nodes → key opportunity nodes pulse bright.

  Story: "We look at your chaos and find the patterns you can't see."
*/

// Node positions (0-100 coordinate space, mapped to viewBox)
const nodes = [
  { x: 12, y: 18, r: 3, key: true },
  { x: 28, y: 12, r: 2.2 },
  { x: 45, y: 8, r: 2.5 },
  { x: 68, y: 14, r: 2.8 },
  { x: 85, y: 10, r: 2 },
  { x: 8, y: 42, r: 2.4 },
  { x: 22, y: 55, r: 2 },
  { x: 38, y: 38, r: 3.2, key: true },
  { x: 52, y: 50, r: 2.6 },
  { x: 65, y: 42, r: 2.2 },
  { x: 78, y: 35, r: 2.8 },
  { x: 92, y: 48, r: 2 },
  { x: 15, y: 75, r: 2.6 },
  { x: 32, y: 70, r: 2 },
  { x: 48, y: 78, r: 2.4 },
  { x: 62, y: 68, r: 3, key: true },
  { x: 75, y: 72, r: 2.2 },
  { x: 88, y: 65, r: 2.5 },
  { x: 50, y: 30, r: 2 },
  { x: 35, y: 88, r: 2.2 },
  { x: 72, y: 85, r: 2 },
  { x: 55, y: 92, r: 2.4 },
]

// Connections — indices into nodes array, grouped by cluster
const connections = [
  // Cluster 1 (top-left)
  [0, 1], [1, 2], [0, 5], [1, 7], [5, 6],
  // Cluster 2 (center)
  [2, 18], [7, 8], [8, 9], [18, 8], [7, 18],
  // Cluster 3 (right)
  [3, 10], [9, 10], [10, 11], [3, 4],
  // Cluster 4 (bottom)
  [6, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17],
  [14, 19], [19, 21], [15, 21], [16, 20],
  // Cross-cluster bridges (drawn last — the "discovery")
  [7, 15], [2, 9], [8, 15], [0, 7], [10, 17],
]

const ease = [0.22, 1, 0.36, 1]

export default function DiscoveryMap() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="w-full aspect-[4/3] max-w-lg mx-auto lg:mx-0">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Scan line gradient */}
          <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="40%" stopColor="white" stopOpacity="0.08" />
            <stop offset="60%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          {/* Key node glow */}
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Scanning line — sweeps down before connections appear */}
        {inView && (
          <motion.rect
            x="0"
            y="0"
            width="100"
            height="20"
            fill="url(#scanGrad)"
            initial={{ y: -20 }}
            animate={{ y: 110 }}
            transition={{ duration: 2.2, delay: 0.2, ease }}
          />
        )}

        {/* Connection lines */}
        {connections.map(([from, to], i) => {
          const a = nodes[from]
          const b = nodes[to]
          const isBridge = i >= connections.length - 5
          const lineDelay = isBridge ? 2.0 + (i - (connections.length - 5)) * 0.15 : 0.8 + i * 0.06

          return (
            <motion.line
              key={`c-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isBridge ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'}
              strokeWidth={isBridge ? 0.4 : 0.25}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{
                pathLength: { duration: 0.8, delay: lineDelay, ease },
                opacity: { duration: 0.3, delay: lineDelay },
              }}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={`n-${i}`}>
            {/* Outer glow for key nodes */}
            {node.key && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.r * 2.5}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={0.3}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: [0, 0.6, 0.3] } : {}}
                transition={{
                  duration: 1.5,
                  delay: 2.5 + i * 0.1,
                  ease,
                  opacity: {
                    duration: 3,
                    delay: 2.5 + i * 0.1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
            )}
            {/* Node dot */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={node.key ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'}
              filter={node.key ? 'url(#nodeGlow)' : undefined}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.4 + i * 0.05,
                ease,
              }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
          </g>
        ))}

        {/* Subtle grid lines in background */}
        {[20, 40, 60, 80].map((v) => (
          <g key={`grid-${v}`}>
            <motion.line
              x1={v} y1="0" x2={v} y2="100"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="0.2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
            />
            <motion.line
              x1="0" y1={v} x2="100" y2={v}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="0.2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
