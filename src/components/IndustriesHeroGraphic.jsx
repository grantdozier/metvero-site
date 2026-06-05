import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Each factory sits at a map point, tinted to its industry
const FACTORIES = [
  { x: 75, y: 165, c: '#D6A86E', delay: 0.9 },  // Higher Education
  { x: 255, y: 135, c: '#5BC0EB', delay: 1.05 }, // Collegiate Athletics
  { x: 140, y: 250, c: '#C87533', delay: 1.2 },  // Government
  { x: 290, y: 252, c: '#C44536', delay: 1.35 }, // Defense
]

const ROUTES = [
  'M75 155 Q 165 95 255 125',
  'M75 155 Q 95 215 140 240',
  'M255 125 Q 305 178 290 242',
  'M140 240 Q 215 272 290 242',
]

// Map stipple
const DOTS = []
for (let gx = 26; gx <= 334; gx += 34) {
  for (let gy = 44; gy <= 300; gy += 34) DOTS.push([gx, gy])
}

function Factory({ x, y, c, delay }) {
  return (
    <motion.g
      style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {/* smoke */}
      {[0, 1, 2].map((s) => (
        <motion.circle
          key={s}
          cx={x + 9} cy={y - 44} r={2.5 + s * 0.6}
          fill={c}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.45, 0], y: [-2, -20, -26] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: delay + s * 0.9 }}
        />
      ))}

      {/* chimney */}
      <rect x={x + 6} y={y - 42} width="6" height="14" rx="1" fill={`${c}55`} stroke={c} strokeWidth="1" />
      {/* sawtooth roof */}
      <path
        d={`M ${x - 18} ${y - 24} L ${x - 18} ${y - 30} L ${x - 9} ${y - 24} L ${x - 9} ${y - 30} L ${x} ${y - 24} L ${x} ${y - 30} L ${x + 9} ${y - 24} L ${x + 9} ${y - 30} L ${x + 18} ${y - 24}`}
        stroke={c} strokeWidth="1.4" fill="none"
      />
      {/* building */}
      <rect x={x - 18} y={y - 24} width="36" height="24" rx="2" fill={`${c}1a`} stroke={c} strokeWidth="1.3" />
      {/* windows */}
      <circle cx={x - 9} cy={y - 12} r="1.8" fill={`${c}aa`} />
      <circle cx={x} cy={y - 12} r="1.8" fill={`${c}aa`} />
      <circle cx={x + 9} cy={y - 12} r="1.8" fill={`${c}aa`} />
      {/* ground pin */}
      <circle cx={x} cy={y} r="2.5" fill={c} />
      <ellipse cx={x} cy={y + 4} rx="20" ry="3" fill={`${c}22`} />
    </motion.g>
  )
}

export default function IndustriesHeroGraphic() {
  return (
    <div className="relative w-full max-w-[440px] mx-auto">
      <div
        className="absolute inset-0 blur-[90px] opacity-[0.10] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, #D6A86E, #5BC0EB 55%, transparent 75%)' }}
      />

      <svg viewBox="0 0 360 380" className="relative w-full h-auto" fill="none">
        {/* Faint landmasses */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
        >
          <ellipse cx="120" cy="150" rx="100" ry="64" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
          <ellipse cx="262" cy="220" rx="84" ry="58" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
          {/* stipple */}
          {DOTS.map((d, i) => (
            <circle key={i} cx={d[0]} cy={d[1]} r="0.9" fill="rgba(255,255,255,0.14)" />
          ))}
        </motion.g>

        {/* Routes between industries */}
        {ROUTES.map((d, i) => (
          <motion.path
            key={`r-${i}`}
            d={d}
            stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="3 5" fill="none"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.8, pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 + i * 0.12, ease }}
          />
        ))}

        {/* Pulse ring at the first industry */}
        <motion.circle
          cx="75" cy="165" r="6"
          stroke="#D6A86E" strokeWidth="1" fill="none"
          animate={{ r: [6, 24], opacity: [0.6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 1.6 }}
        />

        {FACTORIES.map((f, i) => (
          <Factory key={i} {...f} />
        ))}
      </svg>
    </div>
  )
}
