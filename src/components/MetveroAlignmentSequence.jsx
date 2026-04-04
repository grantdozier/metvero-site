import { useRef, useEffect } from 'react'
import { motion, useTransform, useMotionValue } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// ─── Math / Easing ────────────────────────────────────────────────────────────

function lerp(a, b, t) { return a + (b - a) * t }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)) }
function smoothstep(t) { const c = clamp(t, 0, 1); return c * c * (3 - 2 * c) }
function smootherstep(t) { const c = clamp(t, 0, 1); return c * c * c * (c * (c * 6 - 15) + 10) }

function seededRng(seed) {
  let s = seed | 0
  return () => {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5
    return (s >>> 0) / 4294967295
  }
}

// Approximate Gaussian via Box-Muller
function gaussian(rand, mean, std) {
  const u1 = Math.max(rand(), 1e-6)
  const u2 = rand()
  const n = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  return mean + n * std
}

// ─── Chaos cluster centres (start positions) ──────────────────────────────────
// Objects scatter to corners/edges of the VISIBLE viewport so they appear
// immediately on mobile — no more black screen on entry.
const CHAOS_CLUSTERS = [
  { cx: 0.08, cy: 0.10, sx: 0.07, sy: 0.08 }, // top-left corner
  { cx: 0.92, cy: 0.10, sx: 0.07, sy: 0.08 }, // top-right corner
  { cx: 0.08, cy: 0.90, sx: 0.07, sy: 0.08 }, // bottom-left corner
  { cx: 0.92, cy: 0.90, sx: 0.07, sy: 0.08 }, // bottom-right corner
  { cx: 0.50, cy: 0.06, sx: 0.22, sy: 0.05 }, // top edge spread
  { cx: 0.50, cy: 0.94, sx: 0.22, sy: 0.05 }, // bottom edge spread
  { cx: 0.06, cy: 0.50, sx: 0.05, sy: 0.22 }, // left edge spread
  { cx: 0.94, cy: 0.50, sx: 0.05, sy: 0.22 }, // right edge spread
  { cx: 0.20, cy: 0.30, sx: 0.12, sy: 0.14 }, // upper-left interior
  { cx: 0.80, cy: 0.70, sx: 0.12, sy: 0.14 }, // lower-right interior
]

// 5 hub anchors — larger objects that act as spoke centres in the organized state
const HUB_INDICES  = new Set([4, 22, 50, 77, 95])
const HUB_END_POS  = [
  { ex: 0.24, ey: 0.50 }, // left panel centre
  { ex: 0.50, ey: 0.26 }, // centre top
  { ex: 0.50, ey: 0.50 }, // centre middle
  { ex: 0.50, ey: 0.74 }, // centre bottom
  { ex: 0.76, ey: 0.50 }, // right panel centre
]

// ─── Object Generation ────────────────────────────────────────────────────────

function buildObjects(count) {
  const rand = seededRng(9173)
  const hubList = [...HUB_INDICES]
  const out = []

  for (let i = 0; i < count; i++) {
    // ── Type ─────────────────────────────────────────────────────────────────
    const tr = rand()
    let type, w, h, br
    if      (tr < 0.20) { type = 'rect';  w = 58  + rand() * 88;  h = 30 + rand() * 56; br = 2 }
    else if (tr < 0.40) { type = 'card';  w = 68  + rand() * 66;  h = 42 + rand() * 38; br = 2 }
    else if (tr < 0.54) { type = 'panel'; w = 72  + rand() * 120; h =  3 + rand() * 12; br = 1 }
    else if (tr < 0.78) { type = 'dot';   w =  5  + rand() * 17;  h =  0;               br = 50 }
    else                { type = 'line';  w = 42  + rand() * 110; h =  1 + rand() * 2;  br = 0 }
    if (type === 'dot') h = w

    // ── Depth layer ──────────────────────────────────────────────────────────
    // 0 = background (slow, small, faint), 1 = midground, 2 = foreground
    const depthRoll = rand()
    const depth = depthRoll < 0.30 ? 0 : depthRoll < 0.65 ? 1 : 2
    const depthScale       = [0.62, 0.84, 1.00][depth]
    const depthOpacityMult = [0.72, 0.88, 1.00][depth]
    const depthSpeedMult   = [0.72, 0.88, 1.00][depth]   // background converges slower

    // ── Start position — Gaussian cluster ────────────────────────────────────
    const cluster = CHAOS_CLUSTERS[i % 10]
    const sx = clamp(gaussian(rand, cluster.cx, cluster.sx), -0.20, 1.20)
    const sy = clamp(gaussian(rand, cluster.cy, cluster.sy), -0.20, 1.20)

    // ── End position — 3-column system grid ──────────────────────────────────
    const col3 = i % 3
    const posInZone = Math.floor(i / 3)
    const zc = posInZone % 4
    const zr = Math.floor(posInZone / 4)
    let xBase, xSpan
    if      (col3 === 0) { xBase = 0.13; xSpan = 0.22 }
    else if (col3 === 1) { xBase = 0.39; xSpan = 0.22 }
    else                 { xBase = 0.65; xSpan = 0.22 }
    let ex = clamp(xBase + (zc / 3) * xSpan + (rand() - 0.5) * 0.022, 0.08, 0.92)
    let ey = clamp(0.12  + (zr / 8) * 0.76  + (rand() - 0.5) * 0.022, 0.08, 0.92)

    // ── Depth parallax on end position ───────────────────────────────────────
    // Background objects pushed slightly away from viewport centre (0.5, 0.5)
    const parallaxPush = [0.07, 0.03, 0.00][depth]
    ex = ex + (ex - 0.5) * parallaxPush
    ey = ey + (ey - 0.5) * parallaxPush

    // ── Prominence / opacity ──────────────────────────────────────────────────
    const pr = rand()
    let baseOp, endOp
    if      (pr > 0.68) { baseOp = 0.28 + rand() * 0.16; endOp = 0.70 + rand() * 0.25 }
    else if (pr > 0.28) { baseOp = 0.16 + rand() * 0.10; endOp = 0.40 + rand() * 0.20 }
    else                { baseOp = 0.08 + rand() * 0.07; endOp = 0.18 + rand() * 0.12 }
    baseOp *= depthOpacityMult
    endOp  *= depthOpacityMult

    // ── Color ─────────────────────────────────────────────────────────────────
    const cr = rand()
    let fill, stroke
    if      (cr > 0.87) { fill = `rgba(91,192,235,${(0.12 + rand() * 0.14).toFixed(3)})`;  stroke = `rgba(91,192,235,${(0.50 + rand() * 0.35).toFixed(3)})` }
    else if (cr > 0.75) { fill = `rgba(214,168,110,${(0.10 + rand() * 0.12).toFixed(3)})`; stroke = `rgba(214,168,110,${(0.45 + rand() * 0.35).toFixed(3)})` }
    else                { fill = `rgba(255,255,255,${(0.08 + rand() * 0.10).toFixed(3)})`;  stroke = `rgba(255,255,255,${(0.40 + rand() * 0.40).toFixed(3)})` }

    // ── Drift parameters (chaos phase ambient float) ──────────────────────────
    const driftAX = (8  + rand() * 20) * depthScale
    const driftAY = (6  + rand() * 16) * depthScale
    const driftFX = 0.14 + rand() * 0.38
    const driftFY = 0.11 + rand() * 0.32
    const driftPX = rand() * Math.PI * 2
    const driftPY = rand() * Math.PI * 2

    // ── Inner detail seed (for card/rect micro-structure) ─────────────────────
    const detailSeed = rand()

    const obj = {
      type, w, h, br,
      sx, sy, ex, ey,
      baseOp, endOp,
      fill, stroke,
      depth, depthScale, depthOpacityMult, depthSpeedMult,
      startRot: (rand() - 0.5) * 48,
      driftAX, driftAY, driftFX, driftFY, driftPX, driftPY,
      stagger: rand() * 0.025,
      isHub: false,
      detailSeed,
    }

    // ── Override hubs ─────────────────────────────────────────────────────────
    if (HUB_INDICES.has(i)) {
      const hi = hubList.indexOf(i)
      obj.ex    = HUB_END_POS[hi].ex
      obj.ey    = HUB_END_POS[hi].ey
      obj.w     = Math.max(obj.w, 92)
      obj.h     = Math.max(obj.h, 56)
      obj.endOp = Math.min((obj.endOp / depthOpacityMult) * 1.4, 0.55)
      obj.isHub = true
      obj.type  = 'rect'
      obj.br    = 2
      obj.depth = 2
      obj.depthScale = 1.0
      obj.depthOpacityMult = 1.0
      obj.depthSpeedMult   = 1.0
    }

    out.push(obj)
  }

  // Sort by depth so background draws first (painter's algorithm)
  out.sort((a, b) => a.depth - b.depth)
  return out
}

const OBJECTS = buildObjects(100)

// Pre-compute hub indices after sort
const HUB_SORTED_IDX = OBJECTS.reduce((acc, obj, i) => {
  if (obj.isHub) acc.push(i)
  return acc
}, [])

// ─── Canvas Drawing ───────────────────────────────────────────────────────────

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

// Subtle inner micro-structure on cards and rects — data rows, header strip
function drawInnerDetail(ctx, obj, opacity, detailFactor) {
  if (obj.type !== 'card' && obj.type !== 'rect') return
  const a = opacity * detailFactor * 0.55
  if (a < 0.012) return

  ctx.save()
  ctx.globalAlpha = a
  ctx.fillStyle = obj.stroke

  if (obj.type === 'card') {
    // Three data rows of small dots
    const rows = 3
    const dotsPerRow = Math.floor(obj.w / 18)
    for (let r = 0; r < rows; r++) {
      const ry = -obj.h * 0.28 + r * (obj.h * 0.28)
      for (let d = 0; d < dotsPerRow; d++) {
        const dx = -obj.w * 0.38 + d * 17
        const vary = (obj.detailSeed * 4 + r * 1.3 + d * 0.7) % 1
        if (vary > 0.25) { // skip ~25% of dots for realistic data sparsity
          ctx.beginPath()
          ctx.arc(dx, ry, 1.4, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
    // Thin header line
    ctx.fillRect(-obj.w / 2 + 2, -obj.h / 2 + 2, obj.w - 4, 1.5)

  } else if (obj.type === 'rect') {
    // Header strip
    ctx.fillRect(-obj.w / 2 + 2, -obj.h / 2 + 2, obj.w - 4, 2)
    // Sparse dot row
    const dots = Math.floor(obj.w / 22)
    for (let d = 0; d < dots; d++) {
      const dx = -obj.w * 0.40 + d * 21
      if ((obj.detailSeed * 7 + d * 1.1) % 1 > 0.3) {
        ctx.beginPath()
        ctx.arc(dx, obj.h * 0.08, 1.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }

  ctx.restore()
}

function drawObject(ctx, obj, { x, y, rotation, opacity, detailFactor }, rScale) {
  if (opacity < 0.004) return
  // Skip background-depth objects entirely on small screens for performance
  if (rScale < 0.6 && obj.depth === 0) return

  const w = obj.w * rScale
  const h = obj.h * rScale
  const hw = w / 2
  const hh = h / 2

  ctx.save()
  ctx.translate(x, y)
  ctx.scale(obj.depthScale, obj.depthScale)
  if (Math.abs(rotation) > 0.05) ctx.rotate(rotation * (Math.PI / 180))
  ctx.globalAlpha = opacity

  if (obj.type === 'dot') {
    ctx.beginPath()
    ctx.arc(0, 0, hw, 0, Math.PI * 2)
    ctx.fillStyle = obj.stroke
    ctx.fill()
  } else if (obj.type === 'rect' || obj.type === 'card') {
    roundedRect(ctx, -hw, -hh, w, h, obj.br)
    ctx.fillStyle = obj.fill
    ctx.fill()
    ctx.strokeStyle = obj.stroke
    ctx.lineWidth = obj.isHub ? 1 : 0.75
    ctx.stroke()
    if (rScale > 0.65) drawInnerDetail(ctx, obj, opacity, detailFactor)
  } else {
    // panel / line
    if (obj.br > 0) roundedRect(ctx, -hw, -hh, w, h, obj.br)
    else { ctx.beginPath(); ctx.rect(-hw, -hh, w, h) }
    ctx.fillStyle = obj.stroke
    ctx.fill()
  }

  ctx.restore()
}

// Two-pass connector system:
// Pass 1 — hub spokes (higher alpha, up to 8 connections per hub)
// Pass 2 — ambient proximity mesh (lower alpha, 3 per object)
function drawConnectors(ctx, states, progress, W, H, rScale) {
  if (progress < 0.42) return

  const tIn  = smoothstep(clamp((progress - 0.42) / 0.30, 0, 1))
  const tOut = progress > 0.83 ? clamp((progress - 0.83) / 0.13, 0, 1) : 0
  const baseAlpha = tIn * (1 - tOut * 0.94)
  if (baseAlpha < 0.003) return

  const threshNorm = 0.14

  // ── Pass 1: Hub spokes ────────────────────────────────────────────────────
  ctx.save()
  ctx.lineWidth = 0.6
  ctx.beginPath()
  for (const hi of HUB_SORTED_IDX) {
    if (states[hi].opacity < 0.01) continue
    let spokes = 0
    for (let j = 0; j < states.length; j++) {
      if (j === hi || spokes >= 8 || states[j].opacity < 0.01) continue
      const dx = (states[hi].x - states[j].x) / W
      const dy = (states[hi].y - states[j].y) / H
      if (dx * dx + dy * dy < threshNorm * threshNorm * 1.6) {
        ctx.moveTo(states[hi].x, states[hi].y)
        ctx.lineTo(states[j].x, states[j].y)
        spokes++
      }
    }
  }
  ctx.strokeStyle = `rgba(255,255,255,${(baseAlpha * 0.14).toFixed(4)})`
  ctx.stroke()

  // ── Pass 2: Ambient mesh ──────────────────────────────────────────────────
  ctx.beginPath()
  ctx.lineWidth = 0.4
  const maxLines = rScale < 0.6 ? 60 : 160
  const conns = new Array(states.length).fill(0)
  let drawn = 0
  for (let i = 0; i < states.length; i++) {
    if (states[i].opacity < 0.01 || conns[i] >= 3) continue
    for (let j = i + 1; j < states.length; j++) {
      if (drawn >= maxLines) break
      if (states[j].opacity < 0.01 || conns[j] >= 3) continue
      const dx = (states[i].x - states[j].x) / W
      const dy = (states[i].y - states[j].y) / H
      if (dx * dx + dy * dy < threshNorm * threshNorm) {
        ctx.moveTo(states[i].x, states[i].y)
        ctx.lineTo(states[j].x, states[j].y)
        conns[i]++; conns[j]++; drawn++
      }
    }
    if (drawn >= maxLines) break
  }
  ctx.strokeStyle = `rgba(255,255,255,${(baseAlpha * 0.07).toFixed(4)})`
  ctx.stroke()
  ctx.restore()
}

// Multi-layer glow: warm white core → neutral mid → cool blue edge
function drawGlow(ctx, W, H, progress) {
  const tIn  = smootherstep(clamp((progress - 0.36) / 0.38, 0, 1))
  const tOut = progress > 0.80 ? clamp((progress - 0.80) / 0.14, 0, 1) : 0
  const intensity = tIn * (1 - tOut * 0.70)
  if (intensity < 0.003) return

  const cx = W * 0.50
  const cy = H * 0.50

  // Layer 1: warm core
  const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.28)
  g1.addColorStop(0,   `rgba(255,252,235,${(intensity * 0.09).toFixed(4)})`)
  g1.addColorStop(0.5, `rgba(255,252,235,${(intensity * 0.04).toFixed(4)})`)
  g1.addColorStop(1,   'rgba(255,252,235,0)')
  ctx.save(); ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H); ctx.restore()

  // Layer 2: neutral wide halo
  const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.55)
  g2.addColorStop(0,   `rgba(255,255,255,${(intensity * 0.055).toFixed(4)})`)
  g2.addColorStop(0.4, `rgba(255,255,255,${(intensity * 0.022).toFixed(4)})`)
  g2.addColorStop(1,   'rgba(255,255,255,0)')
  ctx.save(); ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H); ctx.restore()

  // Layer 3: cool outer rim
  const g3 = ctx.createRadialGradient(cx, cy, Math.max(W, H) * 0.35, cx, cy, Math.max(W, H) * 0.65)
  g3.addColorStop(0,   'rgba(180,210,255,0)')
  g3.addColorStop(0.5, `rgba(180,210,255,${(intensity * 0.018).toFixed(4)})`)
  g3.addColorStop(1,   'rgba(180,210,255,0)')
  ctx.save(); ctx.fillStyle = g3; ctx.fillRect(0, 0, W, H); ctx.restore()
}

// Brief luminance bloom as objects snap into final positions (~progress 0.77)
function drawBloom(ctx, W, H, progress) {
  const centre = 0.765
  const halfW  = 0.038
  const t = Math.max(0, 1 - Math.abs(progress - centre) / halfW)
  const a = smoothstep(t) * 0.055
  if (a < 0.003) return
  ctx.save()
  ctx.fillStyle = `rgba(255,255,255,${a.toFixed(4)})`
  ctx.fillRect(0, 0, W, H)
  ctx.restore()
}

// ─── Per-object State Computation ────────────────────────────────────────────

function computeState(obj, progress, time, W, H) {
  const p = clamp(progress - obj.stagger, 0, 1)

  let x, y, rotation, opacity, detailFactor

  if (p < 0.22) {
    // ── Phase 1: Chaos — objects visible at scattered positions, slow drift ───
    const dx = Math.sin(time * obj.driftFX + obj.driftPX) * obj.driftAX
    const dy = Math.cos(time * obj.driftFY + obj.driftPY) * obj.driftAY
    x            = obj.sx * W + dx
    y            = obj.sy * H + dy
    rotation     = obj.startRot
    opacity      = obj.baseOp
    detailFactor = 0

  } else if (p < 0.28) {
    // ── Phase 1.5: Tension quiver — pressure builds before release ───────────
    const qt        = (p - 0.22) / 0.06
    const quiverAmp = smoothstep(qt) * (1 - smoothstep(qt)) * 4 * 14
    const qx = Math.sin(time * 20 + obj.driftPX) * quiverAmp
    const qy = Math.cos(time * 24 + obj.driftPY) * quiverAmp
    const dx = Math.sin(time * obj.driftFX + obj.driftPX) * obj.driftAX
    const dy = Math.cos(time * obj.driftFY + obj.driftPY) * obj.driftAY
    x            = obj.sx * W + dx + qx
    y            = obj.sy * H + dy + qy
    rotation     = obj.startRot
    opacity      = obj.baseOp * (1 + smoothstep(qt) * 0.3)
    detailFactor = 0

  } else if (p < 0.58) {
    // ── Phase 2: Magnetic pull — slow start, objects travel ~55% of distance ─
    const raw   = (p - 0.28) / 0.30
    const eased = smoothstep(raw) * obj.depthSpeedMult
    const dStr  = Math.max(0, 1 - eased * 4)
    const dx = Math.sin(time * obj.driftFX + obj.driftPX) * obj.driftAX * dStr
    const dy = Math.cos(time * obj.driftFY + obj.driftPY) * obj.driftAY * dStr
    x            = lerp(obj.sx * W, obj.ex * W, eased * 0.55) + dx
    y            = lerp(obj.sy * H, obj.ey * H, eased * 0.55) + dy
    rotation     = lerp(obj.startRot, obj.startRot * 0.25, eased)
    opacity      = lerp(obj.baseOp, obj.baseOp * 1.5, eased)
    detailFactor = 0

  } else if (p < 0.82) {
    // ── Phase 3: Organization snap — final 45% of travel, quintic settle ─────
    const raw   = (p - 0.58) / 0.24
    const eased = smootherstep(raw) * obj.depthSpeedMult
    const midX  = lerp(obj.sx * W, obj.ex * W, 0.55 * obj.depthSpeedMult)
    const midY  = lerp(obj.sy * H, obj.ey * H, 0.55 * obj.depthSpeedMult)
    const dStr  = Math.max(0, (1 - eased) * 0.08)
    const dx = Math.sin(time * obj.driftFX + obj.driftPX) * obj.driftAX * dStr
    const dy = Math.cos(time * obj.driftFY + obj.driftPY) * obj.driftAY * dStr
    x            = lerp(midX, obj.ex * W, eased) + dx
    y            = lerp(midY, obj.ey * H, eased) + dy
    rotation     = lerp(obj.startRot * 0.25, 0, eased)
    opacity      = lerp(obj.baseOp * 1.5, obj.endOp, eased)
    detailFactor = smoothstep(eased)

  } else if (p < 0.87) {
    // ── Phase 4: Settled — structure complete ────────────────────────────────
    x            = obj.ex * W
    y            = obj.ey * H
    rotation     = 0
    opacity      = obj.endOp
    detailFactor = 1

  } else {
    // ── Phase 5: Reveal — system fades back for Metvero text ─────────────────
    const ft = smoothstep((p - 0.87) / 0.13)
    x            = obj.ex * W
    y            = obj.ey * H
    rotation     = 0
    opacity      = lerp(obj.endOp, obj.endOp * 0.55, ft)
    detailFactor = lerp(1, 0, ft)
  }

  return { x, y, rotation, opacity, detailFactor }
}

function renderFrame(timestamp, ctx, W, H, progressRef) {
  const time     = timestamp / 1000
  const progress = progressRef.current
  // Responsive scale: objects shrink on narrow viewports (mobile)
  const rScale   = Math.min(1, Math.max(0.42, W / 1280))

  ctx.fillStyle = '#0d1117'
  ctx.fillRect(0, 0, W, H)

  // Persistent ambient glow so the section never reads as pure black
  const ambientG = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.6)
  ambientG.addColorStop(0,   'rgba(255,255,255,0.04)')
  ambientG.addColorStop(0.5, 'rgba(255,255,255,0.015)')
  ambientG.addColorStop(1,   'rgba(255,255,255,0)')
  ctx.fillStyle = ambientG
  ctx.fillRect(0, 0, W, H)

  drawGrid(ctx, W, H)

  const states = OBJECTS.map(obj => computeState(obj, progress, time, W, H))

  drawConnectors(ctx, states, progress, W, H, rScale)
  drawGlow(ctx, W, H, progress)
  drawBloom(ctx, W, H, progress)
  OBJECTS.forEach((obj, i) => drawObject(ctx, obj, states[i], rScale))
}

// ─── React Component ──────────────────────────────────────────────────────────

export default function MetveroAlignmentSequence() {
  const containerRef = useRef(null)
  const canvasRef    = useRef(null)
  const rafRef       = useRef(null)
  const progressRef  = useRef(0)

  // Manual scroll tracker — reliable with Lenis unlike useScroll
  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    const section = containerRef.current
    if (!section) return

    const update = () => {
      const rect  = section.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return
      const p = Math.max(0, Math.min(1, -rect.top / total))
      scrollProgress.set(p)
      progressRef.current = p
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [scrollProgress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width        = window.innerWidth  * dpr
      canvas.height       = window.innerHeight * dpr
      canvas.style.width  = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    let active = true
    const loop = ts => {
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

  // ── Staggered reveal — each element enters independently ─────────────────
  const wordmarkOp = useTransform(scrollProgress, [0.72, 0.79], [0, 1])
  const headlineOp = useTransform(scrollProgress, [0.74, 0.83], [0, 1])
  const headlineY  = useTransform(scrollProgress, [0.74, 0.83], ['18px', '0px'])
  const bodyOp     = useTransform(scrollProgress, [0.78, 0.87], [0, 1])
  const bodyY      = useTransform(scrollProgress, [0.78, 0.87], ['12px', '0px'])
  const ctaOp      = useTransform(scrollProgress, [0.82, 0.91], [0, 1])
  const ctaY       = useTransform(scrollProgress, [0.82, 0.91], ['10px', '0px'])

  return (
    <section
      ref={containerRef}
      style={{ height: '230vh', background: '#0d1117', position: 'relative' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' }}>

        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />

        {/* Metvero reveal — staggered entrance */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        >
          {/* Wordmark */}
          <motion.p
            style={{
              opacity: wordmarkOp,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(0.5rem, 0.9vw, 0.7rem)',
              fontWeight: 700,
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.20)',
              margin: '0 0 1.8rem',
              textAlign: 'center',
            }}
          >
            METVERO
          </motion.p>

          {/* Headline */}
          <motion.h2
            style={{
              opacity: headlineOp,
              y: headlineY,
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.8rem, 4.2vw, 3.6rem)',
              fontWeight: 200,
              letterSpacing: '-0.028em',
              color: 'rgba(255,255,255,0.93)',
              textAlign: 'center',
              lineHeight: 1.08,
              margin: '0 0 1.3rem',
            }}
          >
            One layer. Clear direction.
          </motion.h2>

          {/* Body */}
          <motion.p
            style={{
              opacity: bodyOp,
              y: bodyY,
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.875rem, 1.4vw, 1.05rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.36)',
              textAlign: 'center',
              maxWidth: 490,
              lineHeight: 1.78,
              margin: '0 0 2.8rem',
              padding: '0 1.5rem',
            }}
          >
            Metvero brings structure, visibility, and alignment to complex
            institutional operations.
          </motion.p>

          {/* CTA */}
          <motion.div style={{ opacity: ctaOp, y: ctaY, pointerEvents: 'auto' }}>
            <a
              href="#athena"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.13)',
                color: 'rgba(255,255,255,0.78)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.02em',
                textDecoration: 'none',
                transition: 'background 0.3s, border-color 0.3s, color 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'rgba(255,255,255,0.11)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
                e.currentTarget.style.color       = 'rgba(255,255,255,0.95)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'
                e.currentTarget.style.color       = 'rgba(255,255,255,0.78)'
              }}
            >
              Explore Platform
              <ArrowRight size={13} />
            </a>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 90,
            background: 'linear-gradient(to bottom, transparent, #0d1117)',
            pointerEvents: 'none', zIndex: 30,
          }}
        />
      </div>
    </section>
  )
}
