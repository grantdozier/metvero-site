import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Each object: start position (% of viewport), movement delta (vw/vh), rotation, opacity, visual style
const OBJECTS = [
  {
    id: 1, w: 130, h: 75,
    l: '6%', t: '10%',
    dx: ['0vw', '20vw'], dy: ['0vh', '15vh'],
    r: -12, op: 0.12,
    bg: 'rgba(255,255,255,0.045)', bd: '1px solid rgba(255,255,255,0.1)', br: 2,
  },
  {
    id: 2, w: 100, h: 58,
    l: '75%', t: '8%',
    dx: ['0vw', '-16vw'], dy: ['0vh', '18vh'],
    r: 7, op: 0.1,
    bg: 'rgba(255,255,255,0.05)', bd: '1px solid rgba(255,255,255,0.12)', br: 2,
  },
  {
    id: 3, w: 80, h: 44,
    l: '2%', t: '44%',
    dx: ['0vw', '19vw'], dy: ['0vh', '2vh'],
    r: -5, op: 0.08,
    bg: 'rgba(255,255,255,0.035)', bd: '1px solid rgba(255,255,255,0.08)', br: 2,
  },
  {
    id: 4, w: 92, h: 52,
    l: '7%', t: '78%',
    dx: ['0vw', '21vw'], dy: ['0vh', '-16vh'],
    r: 14, op: 0.09,
    bg: 'rgba(100,160,255,0.04)', bd: '1px solid rgba(100,160,255,0.12)', br: 2,
  },
  {
    id: 5, w: 68, h: 68,
    l: '84%', t: '70%',
    dx: ['0vw', '-19vw'], dy: ['0vh', '-8vh'],
    r: -18, op: 0.1,
    bg: 'rgba(255,255,255,0.04)', bd: '1px solid rgba(255,255,255,0.1)', br: 3,
  },
  {
    id: 6, w: 102, h: 32,
    l: '71%', t: '14%',
    dx: ['0vw', '-7vw'], dy: ['0vh', '31vh'],
    r: 5, op: 0.08,
    bg: 'rgba(255,255,255,0.03)', bd: '1px solid rgba(255,255,255,0.08)', br: 2,
  },
  {
    id: 7, w: 115, h: 2,
    l: '87%', t: '41%',
    dx: ['0vw', '-39vw'], dy: ['0vh', '25vh'],
    r: 0, op: 0.18,
    bg: 'rgba(255,255,255,0.18)', bd: 'none', br: 0,
  },
  {
    id: 8, w: 86, h: 50,
    l: '28%', t: '88%',
    dx: ['0vw', '18vw'], dy: ['0vh', '-26vh'],
    r: -8, op: 0.09,
    bg: 'rgba(255,255,255,0.04)', bd: '1px solid rgba(255,255,255,0.1)', br: 2,
  },
  {
    id: 9, w: 18, h: 18,
    l: '53%', t: '4%',
    dx: ['0vw', '-5vw'], dy: ['0vh', '29vh'],
    r: 0, op: 0.2,
    bg: 'rgba(255,255,255,0.1)', bd: '1px solid rgba(255,255,255,0.25)', br: 9,
  },
  {
    id: 10, w: 60, h: 36,
    l: '60%', t: '85%',
    dx: ['0vw', '6vw'], dy: ['0vh', '-22vh'],
    r: 10, op: 0.09,
    bg: 'rgba(91,192,235,0.04)', bd: '1px solid rgba(91,192,235,0.1)', br: 2,
  },
  {
    id: 11, w: 14, h: 14,
    l: '20%', t: '22%',
    dx: ['0vw', '12vw'], dy: ['0vh', '20vh'],
    r: 0, op: 0.18,
    bg: 'rgba(255,255,255,0.08)', bd: '1px solid rgba(255,255,255,0.2)', br: 7,
  },
  {
    id: 12, w: 44, h: 3,
    l: '3%', t: '66%',
    dx: ['0vw', '25vw'], dy: ['0vh', '-8vh'],
    r: -22, op: 0.15,
    bg: 'rgba(255,255,255,0.15)', bd: 'none', br: 0,
  },
]

function AbstractObject({ def, progress }) {
  const x = useTransform(progress, [0.03, 0.75], def.dx)
  const y = useTransform(progress, [0.03, 0.75], def.dy)
  const rotate = useTransform(progress, [0.03, 0.75], [def.r, 0])
  const opacity = useTransform(
    progress,
    [0, 0.04, 0.75, 0.9, 1],
    [0, def.op, def.op * 1.6, def.op * 0.5, def.op * 0.2],
  )

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: def.l,
        top: def.t,
        width: def.w,
        height: def.h,
        background: def.bg,
        border: def.bd,
        borderRadius: def.br,
        x,
        y,
        rotate,
        opacity,
      }}
    />
  )
}

export default function MetveroAlignmentSequence() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Center intelligence glow: emerges mid-sequence, recedes during reveal
  const glowOpacity = useTransform(
    scrollYProgress,
    [0.42, 0.68, 0.85, 1],
    [0, 0.55, 0.25, 0.08],
  )
  const glowScale = useTransform(scrollYProgress, [0.42, 0.75], [0.5, 1])

  // Metvero reveal: only after the system has organized
  const revealOpacity = useTransform(scrollYProgress, [0.82, 0.96], [0, 1])
  const revealY = useTransform(scrollYProgress, [0.82, 0.96], ['18px', '0px'])

  return (
    <section
      ref={containerRef}
      style={{ height: '220vh', background: '#0d1117', position: 'relative' }}
    >
      {/* Sticky full-screen viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Ambient grid — same pattern as hero */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Abstract objects — scatter then organize via scroll */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {OBJECTS.map((obj) => (
            <AbstractObject key={obj.id} def={obj} progress={scrollYProgress} />
          ))}
        </div>

        {/* Center intelligence glow — invisible force pulling everything inward */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 0,
            height: 0,
          }}
        >
          <motion.div
            style={{
              x: '-50%',
              y: '-50%',
              width: 640,
              height: 420,
              background:
                'radial-gradient(ellipse, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)',
              opacity: glowOpacity,
              scale: glowScale,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Metvero reveal — the resolved final state */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: revealOpacity,
            y: revealY,
            pointerEvents: 'none',
            zIndex: 20,
          }}
        >
          {/* Wordmark label */}
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(0.55rem, 1vw, 0.75rem)',
              fontWeight: 700,
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.22)',
              margin: '0 0 1.75rem',
            }}
          >
            METVERO
          </p>

          {/* Primary headline */}
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.75rem, 4vw, 3.4rem)',
              fontWeight: 200,
              letterSpacing: '-0.025em',
              color: 'rgba(255,255,255,0.92)',
              textAlign: 'center',
              margin: '0 0 1.25rem',
              lineHeight: 1.1,
            }}
          >
            One layer. Clear direction.
          </h2>

          {/* Supporting copy */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.875rem, 1.4vw, 1.05rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.38)',
              textAlign: 'center',
              maxWidth: 500,
              lineHeight: 1.75,
              margin: '0 0 2.75rem',
              padding: '0 1.5rem',
            }}
          >
            Metvero brings structure, visibility, and alignment to complex
            institutional operations.
          </p>

          {/* CTA */}
          <a
            href="#athena"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.02em',
              textDecoration: 'none',
              pointerEvents: 'auto',
              transition: 'background 0.3s, border-color 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.11)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.95)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
            }}
          >
            Explore Platform
            <ArrowRight size={13} />
          </a>
        </motion.div>

        {/* Bottom fade — smooth handoff to next section */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: 'linear-gradient(to bottom, transparent, #0d1117)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  )
}
