import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Fragmented "systems" scattered at the top — white, with a few gold/blue tints
const FRAGMENTS = [
  { x: 36, y: 26, w: 36, h: 18, r: -8, c: 'w' },
  { x: 112, y: 16, w: 26, h: 16, r: 6, c: 'g' },
  { x: 184, y: 32, w: 30, h: 14, r: -4, c: 'w' },
  { x: 256, y: 20, w: 24, h: 18, r: 10, c: 'b' },
  { x: 306, y: 44, w: 22, h: 14, r: -10, c: 'w' },
  { x: 70, y: 70, w: 28, h: 16, r: 4, c: 'w' },
  { x: 150, y: 66, w: 22, h: 14, r: -6, c: 'b' },
  { x: 222, y: 74, w: 30, h: 16, r: 8, c: 'g' },
  { x: 296, y: 88, w: 20, h: 12, r: -4, c: 'w' },
  { x: 110, y: 106, w: 24, h: 14, r: 6, c: 'w' },
  { x: 190, y: 110, w: 26, h: 16, r: -8, c: 'w' },
  { x: 40, y: 100, w: 18, h: 12, r: 10, c: 'g' },
]

const COLORS = {
  w: { stroke: 'rgba(255,255,255,0.45)', fill: 'rgba(255,255,255,0.04)' },
  g: { stroke: 'rgba(214,168,110,0.75)', fill: 'rgba(214,168,110,0.08)' },
  b: { stroke: 'rgba(91,192,235,0.75)', fill: 'rgba(91,192,235,0.08)' },
}

// Loose connectors between nearby fragments (the "fragmented" mesh)
const MESH = [
  [54, 35, 125, 24],
  [199, 39, 268, 29],
  [84, 78, 161, 73],
  [237, 82, 203, 118],
  [122, 113, 50, 106],
]

// Convergence lines funneling down into the layer bar
const FUNNEL = [
  [54, 44, 90, 188],
  [125, 32, 130, 188],
  [199, 46, 175, 188],
  [237, 90, 215, 188],
  [268, 38, 255, 188],
  [122, 120, 150, 188],
  [203, 126, 195, 188],
]

export default function ProductsHeroGraphic() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 blur-[90px] opacity-[0.10] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 55%, #D6A86E, #5BC0EB 60%, transparent 75%)' }}
      />

      <svg viewBox="0 0 360 380" className="relative w-full h-auto" fill="none">
        <defs>
          <linearGradient id="layerGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D6A86E" />
            <stop offset="100%" stopColor="#5BC0EB" />
          </linearGradient>
          <linearGradient id="layerFill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(214,168,110,0.14)" />
            <stop offset="100%" stopColor="rgba(91,192,235,0.14)" />
          </linearGradient>
        </defs>

        {/* Mesh between fragments */}
        {MESH.map((m, i) => (
          <motion.line
            key={`mesh-${i}`}
            x1={m[0]} y1={m[1]} x2={m[2]} y2={m[3]}
            stroke="rgba(255,255,255,0.12)" strokeWidth="0.75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease }}
          />
        ))}

        {/* Fragmented systems — gentle drift */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          {FRAGMENTS.map((f, i) => (
            <motion.rect
              key={`frag-${i}`}
              x={f.x} y={f.y} width={f.w} height={f.h} rx="2"
              fill={COLORS[f.c].fill}
              stroke={COLORS[f.c].stroke}
              strokeWidth="1"
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ opacity: 0, rotate: f.r, scale: 0.85 }}
              animate={{ opacity: 1, rotate: f.r, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease }}
            />
          ))}
        </motion.g>

        {/* Funnel lines into the layer */}
        {FUNNEL.map((l, i) => (
          <motion.line
            key={`funnel-${i}`}
            x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]}
            stroke="rgba(255,255,255,0.16)" strokeWidth="0.75"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.7, pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.9 + i * 0.05, ease }}
          />
        ))}

        {/* THE LAYER — absorbs the load */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1, ease }}
        >
          {/* glow pulse */}
          <motion.rect
            x="40" y="190" width="280" height="26" rx="6"
            fill="url(#layerGrad)"
            animate={{ opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'blur(8px)' }}
          />
          <rect x="44" y="192" width="272" height="22" rx="5" fill="url(#layerFill)" stroke="url(#layerGrad)" strokeWidth="1.2" />
        </motion.g>

        {/* Connector from layer to decision surface */}
        <motion.line
          x1="180" y1="216" x2="180" y2="248"
          stroke="rgba(255,255,255,0.25)" strokeWidth="1"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.7, ease }}
        />

        {/* THE DECISION SURFACE — single, clean, ordered */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.9, ease }}
        >
          <rect x="76" y="250" width="208" height="110" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
          {/* header strip */}
          <rect x="88" y="262" width="120" height="7" rx="3.5" fill="rgba(255,255,255,0.22)" />
          <circle cx="270" cy="265.5" r="4" fill="rgba(255,255,255,0.18)" />

          {/* rows */}
          <rect x="88" y="286" width="184" height="6" rx="3" fill="rgba(255,255,255,0.10)" />
          <rect x="88" y="302" width="160" height="6" rx="3" fill="rgba(255,255,255,0.10)" />

          {/* highlighted decision row */}
          <motion.rect
            x="84" y="320" width="192" height="24" rx="5"
            fill="rgba(214,168,110,0.10)" stroke="rgba(214,168,110,0.45)" strokeWidth="1"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}
          />
          <circle cx="98" cy="332" r="4" fill="#D6A86E" />
          <rect x="110" y="329" width="120" height="6" rx="3" fill="rgba(214,168,110,0.55)" />
        </motion.g>
      </svg>
    </div>
  )
}
