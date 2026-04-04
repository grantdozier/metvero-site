import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// ─── Utilities ────────────────────────────────────────────────────────────────

function seededRng(seed) {
  let s = seed | 0
  return () => {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5
    return (s >>> 0) / 4294967295
  }
}

function lerp(a, b, t) { return a + (b - a) * t }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)) }
// Smoothstep: slow start → accelerate → gentle settle
function smoothstep(t) { return t * t * (3 - 2 * t) }
// Smoother: even more gradual — feels more like gravitational pull
function smootherstep(t) { return t * t * t * (t * (t * 6 - 15) + 10) }

// ─── Object Generation (module-level — runs once) ─────────────────────────────

function buildObjects(count) {
  const rand = seededRng(7741)
  const out = []

  for (let i = 0; i < count; i++) {
    // ── Type ──────────────────────────────────────────────────────────────────
    const typeRoll = rand()
    let type, w, h, br
    if (typeRoll < 0.20) {
      type = 'rect';  w = 55  + rand() * 90;  h = 28 + rand() * 58; br = 2
    } else if (typeRoll < 0.40) {
      type = 'card';  w = 65  + rand() * 70;  h = 40 + rand() * 40; br = 2
    } else if (typeRoll < 0.55) {
      type = 'panel'; w = 70  + rand() * 130; h = 3  + rand() * 13; br = 1
    } else if (typeRoll < 0.78) {
      type = 'dot';   w = 5   + rand() * 18;  h = 0;                 br = 50
    } else {
      type = 'line';  w = 40  + rand() * 115; h = 1  + rand() * 2;  br = 0
    }
    if (type === 'dot') h = w

    // ── Start position — edges, corners, and off-screen ───────────────────────
    let sx, sy
    const zone = i % 8
    switch (zone) {
      case 0: sx = -0.08 + rand() * 0.12; sy = 0.05 + rand() * 0.90; break // left
      case 1: sx =  0.96 + rand() * 0.12; sy = 0.05 + rand() * 0.90; break // right
      case 2: sx =  0.05 + rand() * 0.90; sy = -0.10 + rand() * 0.14; break // top
      case 3: sx =  0.05 + rand() * 0.90; sy =  0.96 + rand() * 0.12; break // bottom
      case 4: sx =  rand() * 0.13;         sy = rand() * 0.16;          break // top-left
      case 5: sx =  0.87 + rand() * 0.13; sy = rand() * 0.16;           break // top-right
      case 6: sx =  rand() * 0.13;         sy = 0.84 + rand() * 0.16;   break // bot-left
      default:sx =  0.87 + rand() * 0.13; sy = 0.84 + rand() * 0.16;   break // bot-right
    }

    // ── End position — 3-column system grid ──────────────────────────────────
    // Column 0: left panel  (x 0.14–0.36)
    // Column 1: center      (x 0.40–0.60)
    // Column 2: right panel (x 0.64–0.86)
    const endZone  = i % 3
    const posInZone = Math.floor(i / 3) // 0..33
    const zoneCol   = posInZone % 4
    const zoneRow   = Math.floor(posInZone / 4) // 0..8

    let exBase, exRange
    if (endZone === 0)      { exBase = 0.14; exRange = 0.22 }
    else if (endZone === 1) { exBase = 0.40; exRange = 0.20 }
    else                    { exBase = 0.64; exRange = 0.22 }

    const ex = clamp(exBase + (zoneCol / 3) * exRange + (rand() - 0.5) * 0.024, 0.08, 0.92)
    const ey = clamp(0.12   + (zoneRow / 8) * 0.76    + (rand() - 0.5) * 0.024, 0.08, 0.92)

    // ── Prominence ────────────────────────────────────────────────────────────
    const prom = rand()
    let baseOp, endOp
    if (prom > 0.68) {
      baseOp = 0.07 + rand() * 0.07; endOp = 0.24 + rand() * 0.22
    } else if (prom > 0.28) {
      baseOp = 0.04 + rand() * 0.05; endOp = 0.10 + rand() * 0.13
    } else {
      baseOp = 0.02 + rand() * 0.03; endOp = 0.04 + rand() * 0.05
    }

    // ── Colors ────────────────────────────────────────────────────────────────
    const cr = rand()
    let fill, stroke
    if (cr > 0.86) {
      fill   = `rgba(91,192,235,${(rand() * 0.05).toFixed(3)})`
      stroke = `rgba(91,192,235,${(0.08 + rand() * 0.12).toFixed(3)})`
    } else if (cr > 0.74) {
      fill   = `rgba(214,168,110,${(rand() * 0.04).toFixed(3)})`
      stroke = `rgba(214,168,110,${(0.07 + rand() * 0.09).toFixed(3)})`
    } else {
      fill   = `rgba(255,255,255,${(0.02 + rand() * 0.04).toFixed(3)})`
      stroke = `rgba(255,255,255,${(0.05 + rand() * 0.10).toFixed(3)})`
    }

    // ── Drift (slow ambient float during chaos state) ─────────────────────────
    const driftAX = 7  + rand() * 19
    const driftAY = 5  + rand() * 16
    const driftFX = 0.15 + rand() * 0.40
    const driftFY = 0.12 + rand() * 0.35
    const driftPX = rand() * Math.PI * 2
    const driftPY = rand() * Math.PI * 2

    out.push({
      type, w, h, br,
      sx, sy, ex, ey,
      baseOp, endOp,
      fill, stroke,
      startRot: (rand() - 0.5) * 46,
      driftAX, driftAY, driftFX, driftFY, driftPX, driftPY,
      stagger: rand() * 0.03, // subtle per-object delay
    })
  }

  return out
}

const OBJECTS = buildObjects(100)

// ─── Canvas Rendering ─────────────────────────────────────────────────────────

function drawGrid(ctx, W, H) {
  ctx.save()
  ctx.globalAlpha = 0.028
  ctx.strokeStyle = 'rgba(255,255,255,0.5)'
  ctx.lineWidth = 0.5
  ctx.beginPath()
  const step = 80
  for (let x = 0; x <= W + step; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, H) }
  for (let y = 0; y <= H + step; y += step) { ctx.moveTo(0, y); ctx.lineTo(W, y) }
  ctx.stroke()
  ctx.restore()
}

function roundedRect(ctx, x, y, w, h, r) {
  const rc = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + rc, y)
  ctx.lineTo(x + w - rc, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + rc)
  ctx.lineTo(x + w, y + h - rc)
  ctx.quadraticCurveTo(x + w, y + h, x + w - rc, y + h)
  ctx.lineTo(x + rc, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - rc)
  ctx.lineTo(x, y + rc)
  ctx.quadraticCurveTo(x, y, x + rc, y)
  ctx.closePath()
}

function drawObject(ctx, obj, { x, y, rotation, opacity }) {
  if (opacity < 0.004) return
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.translate(x, y)
  if (Math.abs(rotation) > 0.1) ctx.rotate(rotation * (Math.PI / 180))

  const hw = obj.w / 2
  const hh = obj.h / 2

  if (obj.type === 'dot') {
    ctx.beginPath()
    ctx.arc(0, 0, hw, 0, Math.PI * 2)
    ctx.fillStyle = obj.stroke
    ctx.fill()
  } else if (obj.type === 'rect' || obj.type === 'card') {
    roundedRect(ctx, -hw, -hh, obj.w, obj.h, obj.br)
    ctx.fillStyle = obj.fill
    ctx.fill()
    ctx.strokeStyle = obj.stroke
    ctx.lineWidth = 0.75
    ctx.stroke()
  } else {
    // panel / line — solid thin elements
    if (obj.br > 0) {
      roundedRect(ctx, -hw, -hh, obj.w, obj.h, obj.br)
    } else {
      ctx.beginPath()
      ctx.rect(-hw, -hh, obj.w, obj.h)
    }
    ctx.fillStyle = obj.stroke
    ctx.fill()
  }

  ctx.restore()
}

// Connector lines between nearby objects (appear as organization emerges)
function drawConnectors(ctx, states, progress, W, H) {
  if (progress < 0.42) return

  const tIn  = smoothstep(clamp((progress - 0.42) / 0.32, 0, 1))
  const tOut = progress > 0.82 ? clamp((progress - 0.82) / 0.14, 0, 1) : 0
  const alpha = tIn * 0.085 * (1 - tOut * 0.92)
  if (alpha < 0.003) return

  const threshold = 0.145 // normalized viewport fraction
  const connsPerObj = new Array(states.length).fill(0)
  let drawn = 0

  ctx.save()
  ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(4)})`
  ctx.lineWidth = 0.5
  ctx.beginPath()

  for (let i = 0; i < states.length; i++) {
    if (states[i].opacity < 0.01 || connsPerObj[i] >= 3) continue
    for (let j = i + 1; j < states.length; j++) {
      if (drawn >= 200) break
      if (states[j].opacity < 0.01 || connsPerObj[j] >= 3) continue
      const dx = (states[i].x - states[j].x) / W
      const dy = (states[i].y - states[j].y) / H
      if (dx * dx + dy * dy < threshold * threshold) {
        ctx.moveTo(states[i].x, states[i].y)
        ctx.lineTo(states[j].x, states[j].y)
        connsPerObj[i]++
        connsPerObj[j]++
        drawn++
      }
    }
    if (drawn >= 200) break
  }

  ctx.stroke()
  ctx.restore()
}

// Radial glow emerging from center as order forms
function drawGlow(ctx, W, H, progress) {
  const tIn  = smootherstep(clamp((progress - 0.38) / 0.36, 0, 1))
  const tOut = progress > 0.80 ? clamp((progress - 0.80) / 0.14, 0, 1) : 0
  const a = tIn * 0.075 * (1 - tOut * 0.68)
  if (a < 0.003) return

  const cx = W / 2
  const cy = H / 2
  const r  = Math.max(W, H) * 0.48
  const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0,    `rgba(255,255,255,${a.toFixed(4)})`)
  g.addColorStop(0.30, `rgba(255,255,255,${(a * 0.55).toFixed(4)})`)
  g.addColorStop(0.65, `rgba(255,255,255,${(a * 0.15).toFixed(4)})`)
  g.addColorStop(1,    'rgba(255,255,255,0)')

  ctx.save()
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
  ctx.restore()
}

// Per-object state computation — the core animation logic
function computeState(obj, progress, time, W, H) {
  // Per-object stagger shifts when movement begins
  const p = clamp(progress - obj.stagger, 0, 1)

  let x, y, rotation, opacity

  if (p < 0.20) {
    // ── Phase 1: Chaos — objects at scattered start positions with ambient drift ──
    const fadeIn   = Math.min(1, p / 0.04)
    const driftStr = 1.0
    const dx = Math.sin(time * obj.driftFX + obj.driftPX) * obj.driftAX * driftStr
    const dy = Math.cos(time * obj.driftFY + obj.driftPY) * obj.driftAY * driftStr

    x        = obj.sx * W + dx
    y        = obj.sy * H + dy
    rotation = obj.startRot
    opacity  = lerp(0, obj.baseOp, fadeIn)

  } else if (p < 0.50) {
    // ── Phase 2: Magnetic pull — objects begin moving inward ──
    const raw    = (p - 0.20) / 0.30
    const eased  = smoothstep(raw) // slow start, acceleration, not yet settled
    const driftStr = Math.max(0, 1 - eased * 3.0)
    const dx = Math.sin(time * obj.driftFX + obj.driftPX) * obj.driftAX * driftStr
    const dy = Math.cos(time * obj.driftFY + obj.driftPY) * obj.driftAY * driftStr

    x        = lerp(obj.sx * W, obj.ex * W, eased * 0.6) + dx // only 60% of the way
    y        = lerp(obj.sy * H, obj.ey * H, eased * 0.6) + dy
    rotation = lerp(obj.startRot, obj.startRot * 0.3, eased)
    opacity  = lerp(obj.baseOp, obj.baseOp * 1.4, eased)

  } else if (p < 0.75) {
    // ── Phase 3: Organization snap — objects converge to structured positions ──
    // They arrive carrying momentum from phase 2 (already at 60% of travel)
    const raw   = (p - 0.50) / 0.25
    const eased = smootherstep(raw) // very smooth settle feel
    const driftStr = Math.max(0, (1 - eased) * 0.15) // nearly zero drift now
    const dx = Math.sin(time * obj.driftFX + obj.driftPX) * obj.driftAX * driftStr
    const dy = Math.cos(time * obj.driftFY + obj.driftPY) * obj.driftAY * driftStr

    // Travel from 60% to 100% of end position over this phase
    const startFraction = lerp(obj.sx * W, obj.ex * W, 0.6)
    const startFractionY = lerp(obj.sy * H, obj.ey * H, 0.6)

    x        = lerp(startFraction, obj.ex * W, eased) + dx
    y        = lerp(startFractionY, obj.ey * H, eased) + dy
    rotation = lerp(obj.startRot * 0.3, 0, eased)
    opacity  = lerp(obj.baseOp * 1.4, obj.endOp, eased)

  } else if (p < 0.86) {
    // ── Phase 4: Settled — structure complete, motion stops ──
    x        = obj.ex * W
    y        = obj.ey * H
    rotation = 0
    opacity  = obj.endOp

  } else {
    // ── Phase 5: Reveal — organized system fades back for Metvero ──
    const ft = (p - 0.86) / 0.14
    x        = obj.ex * W
    y        = obj.ey * H
    rotation = 0
    opacity  = lerp(obj.endOp, obj.endOp * 0.10, smoothstep(ft))
  }

  return { x, y, rotation, opacity }
}

function renderFrame(timestamp, ctx, W, H, progressRef) {
  const time     = timestamp / 1000
  const progress = progressRef.current

  // Background
  ctx.fillStyle = '#0d1117'
  ctx.fillRect(0, 0, W, H)

  drawGrid(ctx, W, H)

  const states = OBJECTS.map(obj => computeState(obj, progress, time, W, H))

  drawConnectors(ctx, states, progress, W, H)
  drawGlow(ctx, W, H, progress)
  OBJECTS.forEach((obj, i) => drawObject(ctx, obj, states[i]))
}

// ─── React Component ──────────────────────────────────────────────────────────

export default function MetveroAlignmentSequence() {
  const containerRef = useRef(null)
  const canvasRef    = useRef(null)
  const rafRef       = useRef(null)
  const progressRef  = useRef(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      canvas.width        = W * dpr
      canvas.height       = H * dpr
      canvas.style.width  = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    let active = true
    const loop = (ts) => {
      if (!active) return
      renderFrame(ts, ctx, window.innerWidth, window.innerHeight, progressRef)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      active = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Metvero reveal — HTML overlay driven by scroll
  const revealOpacity = useTransform(scrollYProgress, [0.84, 0.97], [0, 1])
  const revealY       = useTransform(scrollYProgress, [0.84, 0.97], ['20px', '0px'])

  return (
    <section
      ref={containerRef}
      style={{ height: '220vh', background: '#0d1117', position: 'relative' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Canvas — all objects, lines, glow rendered here */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0 }}
        />

        {/* Metvero reveal overlay */}
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
              e.currentTarget.style.background   = 'rgba(255,255,255,0.11)'
              e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.22)'
              e.currentTarget.style.color        = 'rgba(255,255,255,0.95)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background   = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.borderColor  = 'rgba(255,255,255,0.14)'
              e.currentTarget.style.color        = 'rgba(255,255,255,0.8)'
            }}
          >
            Explore Platform
            <ArrowRight size={13} />
          </a>
        </motion.div>

        {/* Bottom fade — smooth handoff into next section */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 90,
            background: 'linear-gradient(to bottom, transparent, #0d1117)',
            pointerEvents: 'none',
            zIndex: 30,
          }}
        />
      </div>
    </section>
  )
}
