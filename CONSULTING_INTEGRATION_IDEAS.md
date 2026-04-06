# Metvero — Integrating AI Consulting into the Site

## The Problem
Metvero is an **AI consulting firm first**, with two proprietary products (Athena & Hermes).
The current site is 100% product-focused. We need to lead with the consulting identity
without breaking the visual language or the landing page flow people love.

---

## How Palantir Thinks About This

Palantir doesn't have a "Services" page. They don't separate "consulting" from "products."
Instead, they present **one unified identity**: *we are the people who solve impossible
data problems, and here are the tools we built along the way.*

Their Forward Deployed Engineers aren't on a services page — they're part of the product
narrative. The message is: **you're not buying software, you're buying us.**

That's the energy Metvero should channel.

---

## Approach A — "Reframe the Hero, Keep the Flow"

**What changes:** Only the hero section and value proposition text.
**What stays:** Alignment sequence, product sections, cinematic divider, stats, CTA — all untouched.

### The Idea
The hero currently says *"A Decision Layer for Modern Universities"* and rotates between
Academic/Athletic Operations. Instead:

- **New hero headline:** Something like *"AI Strategy for the Institutions That Shape the Future"*
  or *"We Build the Intelligence Layer for Modern Universities"*
- **Subtitle shifts** from platform-speak to capability-speak:
  *"From custom AI solutions to purpose-built platforms — we partner with institutions
  to turn fragmented systems into competitive advantages."*
- The "Enter Platform" CTA becomes something like **"See Our Work"** (scrolls to products)
  and "Get in Touch" stays.

The products (Athena/Hermes) then appear below as **proof of what we build** — not the
whole story, but the flagship examples.

### Value Prop Section Shift
The current "Advising. Athletics. Operations. One platform..." block becomes something
that speaks to consulting DNA:
> *"We don't sell dashboards. We embed with your team, learn your systems,
> and build intelligence that actually ships."*

### Pros
- Minimal code changes — hero text + value prop text only
- Doesn't disrupt the visual flow at all
- Products still shine, just recontextualized as "things we built"
- Fastest path to launch

### Cons
- No dedicated space to explain what consulting actually looks like
- Might feel like the products are the whole company still

---

## Approach B — "New Section Above Products"

**What changes:** Hero text + a new section inserted between the alignment sequence and the products.
**What stays:** Everything else in its current position.

### The Idea
After the alignment sequence (which already visually represents "bringing order from chaos"
— perfect for consulting), add a **Services / What We Do** section:

```
┌─────────────────────────────────────────────────┐
│  HERO (reframed as AI consulting firm)          │
│  "We Build Intelligence for Institutions"       │
├─────────────────────────────────────────────────┤
│  ALIGNMENT SEQUENCE (unchanged — still fire)    │
├─────────────────────────────────────────────────┤
│  ★ NEW: WHAT WE DO / SERVICES SECTION ★        │
│                                                 │
│  Three pillars, Palantir-style:                 │
│                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ AI       │ │ Systems  │ │ Purpose- │       │
│  │ Strategy │ │ Integra- │ │ Built    │       │
│  │ & Con-   │ │ tion     │ │ Products │       │
│  │ sulting  │ │          │ │          │       │
│  └──────────┘ └──────────┘ └──────────┘       │
│                                                 │
│  Copy tone: "We start with your problem,        │
│  not our product."                              │
├─────────────────────────────────────────────────┤
│  VALUE PROP (tweaked to bridge services→products)│
├─────────────────────────────────────────────────┤
│  ATHENA SECTION (unchanged)                     │
├─────────────────────────────────────────────────┤
│  CINEMATIC DIVIDER (unchanged)                  │
├─────────────────────────────────────────────────┤
│  HERMES SECTION (unchanged)                     │
├─────────────────────────────────────────────────┤
│  STATS / CTA (unchanged)                        │
└─────────────────────────────────────────────────┘
```

The three pillars could be something like:
1. **AI Strategy & Advisory** — "We assess your data landscape, identify high-impact
   AI opportunities, and build the roadmap."
2. **Systems Integration** — "We connect your fragmented tools into a unified
   intelligence layer — no rip-and-replace."
3. **Purpose-Built Products** — "When off-the-shelf won't cut it, we build exactly
   what you need." (This pillar transitions naturally into Athena/Hermes below.)

### Pros
- Clear consulting identity without hiding the products
- Natural narrative flow: here's who we are → here's what we do → here's what we've built
- The alignment sequence becomes even more meaningful (chaos → order = what consulting does)
- Products feel like crown jewels of the consulting practice, not the whole company

### Cons
- One new component to build (but can match existing design language)
- Page gets slightly longer

---

## Approach C — "Palantir Full Send"

**What changes:** Significant homepage restructure + new pages.
**What stays:** Visual design system, product pages, animations.

### The Idea
Full Palantir-style architecture:
- Homepage is about **Metvero the company** — mission, capability, team DNA
- Products live as child pages under a unified narrative
- Possible new pages: `/solutions` or `/consulting`, `/athena`, `/hermes`
- Nav restructure: `Solutions` dropdown → Consulting | Athena | Hermes

### Pros
- Most complete representation of the business
- Scales well as more products/services are added
- Maximum credibility as a consulting firm

### Cons
- Biggest lift — multiple new pages, nav restructure
- Risk of losing what currently works about the landing page
- Might be premature if the consulting offering isn't fully defined yet

---

## My Recommendation

**Start with Approach B.**

Here's why:
- It respects the landing page you love — the alignment sequence, product sections,
  and cinematic divider all stay exactly where they are
- It introduces consulting as the **frame** around the products, not a replacement for them
- The alignment sequence already tells the consulting story visually — particles/chaos
  becoming ordered structure = "we take your mess and make it intelligent"
- It's Palantir's playbook: lead with capability, prove with products
- It's one new section + hero text changes. Achievable without breaking anything.
- If consulting grows and you need Approach C later, B is a stepping stone to get there

### The Narrative Arc Would Be:
1. **Hero:** "We are Metvero. We build AI for institutions." (identity)
2. **Alignment Sequence:** Visual metaphor — chaos becomes structure (emotional hook)
3. **What We Do:** Three pillars of capability (credibility)
4. **Athena:** Here's what that looks like for academics (proof)
5. **Hermes:** Here's what that looks like for athletics (proof)
6. **Stats + CTA:** Built for scale. Let's talk. (close)

That's a story. Not a product catalog — a story about a company.

---

## Open Questions
- How do you want to describe the consulting offering? (Strategy? Implementation? Embedded teams?)
- Are there other verticals beyond higher ed that consulting would serve?
- Do you want the nav to change? (e.g., "Solutions" dropdown vs. keeping Athena/Hermes top-level)
- Should "Get in Touch" differentiate between consulting inquiries and product interest?
