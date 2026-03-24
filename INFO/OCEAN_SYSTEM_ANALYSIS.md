# Ocean: A Complete System Analysis

## What This Is

Ocean is a unified academic intelligence platform that does something no university system in the country currently does: it takes every fragmented, disconnected data source a university maintains — student records, degree requirements, live course schedules, LMS grades, athletic schedules, transfer equivalencies, career outcomes — and rectifies them into a single coherent model of a student's past, present, and every possible future.

The result is that for the first time, a student can dream — and the system answers with a real, verified, actionable path.

---

## The Problem That Exists Today

Universities run on a patchwork of enterprise systems that were never designed to talk to each other:

| System | What It Holds | What It Can't Do |
|--------|--------------|------------------|
| **Workday** (Student Module) | Student records, transcripts, degree audits, enrollment | Cannot map credits to more than one degree at a time. Shows 120 hours earned but can't tell you that only 65 satisfy your actual degree. The "academic progress" percentage is acknowledged as **always inaccurate**. |
| **Banner** (Legacy SIS) | Historical student data, old mainframe audits | Being sunset by Workday at many schools. Still consulted because Workday doesn't have complete history. |
| **Moodle** (LMS) | Real-time grades, assignment scores, professor feedback | Completely disconnected from Workday. An interim grade in Workday may say B+ while Moodle shows the student is actually at 66.33% (D). Nobody sees both at once. |
| **Teamworks** (Athletic Scheduling) | Practice schedules, film sessions, meals, travel, study hall, CARA countable hours | No connection to academic systems. An advisor building a class schedule has to manually check this in a separate app to know if a course conflicts with practice. |
| **SAM** (Student Athlete Management) | Eligibility tracking, compliance monitoring | Provides compliance rules but doesn't integrate with degree path planning. |
| **LSU General Catalog** | Official degree requirements, semester-by-semester plans, prerequisite chains | A static document. Each college formats their requirements differently. Business uses a checklist. Science uses dense paragraph text. Education uses yet another format. An advisor must manually read and interpret each one. |
| **Course Offerings** (Workday Schedule of Classes) | Live sections, meeting patterns, delivery modes, enrollment counts, instructor assignments | Shows what's available but doesn't know what the student needs. No connection to degree requirements or athletic schedules. |

**The fundamental problem:** An advisor trying to help a student must log into 3-5 separate systems, cross-reference data manually, and build a plan on paper or in a personal spreadsheet. For a transfer student with 72 credits, this takes 3-4 hours — and it only produces a plan for **one** degree program. There might be 15 other programs where those credits map better, but nobody has time to check.

The student never sees their best path. They see the first path the advisor had time to build.

---

## What Ocean Does

Ocean ingests data from all of these systems and runs it through a pipeline of computation engines that produce something none of them can produce alone:

```
    EXTERNAL SYSTEMS (data sources)
    ================================
    Workday          Moodle         Teamworks       LSU Catalog      Course Offerings
    (transcripts,    (real          (practice,       (degree          (live sections,
     degree audit,    grades,        travel,          requirements,    meeting patterns,
     enrollment)      feedback)      meals)           prereqs)         seats, delivery)
         |               |              |                 |                 |
         v               v              v                 v                 v
    +====================================================================+
    |                     OCEAN DATA LAYER                                |
    |                                                                     |
    |  Normalized, reconciled, unified student model                      |
    |  - Workday audit corrected against actual grades                    |
    |  - Transfer credits mapped against known equivalencies              |
    |  - Athletic schedule parsed into time blocks                        |
    |  - All degree programs from all colleges standardized               |
    |  - 481+ live course sections with enrollment/capacity               |
    +============================|========================================+
                                 |
                                 v
    +====================================================================+
    |                     ENGINE LAYER                                    |
    |                                                                     |
    |  creditMappingEngine    -> Auto-map + advisor projected/actual      |
    |  degreePathEngine       -> Evaluate ALL degrees simultaneously      |
    |  sectionMatcher         -> Match requirements to live sections      |
    |  scheduleConflictEngine -> Cross-reference with athletic schedule   |
    |  scheduleOptimizer      -> Build conflict-free optimal schedule     |
    |  projectionEngine       -> Simulate best/likely/risk futures        |
    |  rippleAnalyzer         -> Compute downstream impact of any change  |
    |  forkEngine             -> Model what-if scenarios (switch major,   |
    |                            add minor, skip semester, add summer)    |
    |  dreamMapper            -> Map natural language dreams to careers   |
    |  socraticEngine         -> Guided discovery conversation            |
    |  roiCalculator          -> Tuition, debt, salary, 5-year ROI       |
    |  degreeGraph            -> DAG of prerequisites + critical paths    |
    +============================|========================================+
                                 |
                                 v
    +====================================================================+
    |                     INTERFACE LAYER (9 views)                       |
    |                                                                     |
    |  THE PLAN (Student Dashboard)                                      |
    |    - Semester roadmap, course list, GPA, risk signals               |
    |    - Career targeting, ROI drawer, what-if impact cards             |
    |                                                                     |
    |  THE QUEST (Student Path Visualization)                            |
    |    - SVG trail map with GSAP 3D camera                             |
    |    - Dream input -> career cluster -> degree paths -> semester      |
    |      nodes -> fork points -> destination                            |
    |    - Socratic AI trail guide conversation                          |
    |    - Compare paths side-by-side                                    |
    |    - Share paths with advisors                                     |
    |                                                                     |
    |  DEGREE MAPPING (Advisor Workflow)                                 |
    |    - Transfer intake -> auto-map credits                           |
    |    - Manual mapper -> advisor projects unmapped credits             |
    |    - All degree paths ranked simultaneously                        |
    |    - Schedule builder with live section matching                    |
    |    - Approval queue for registrar handoff                          |
    |                                                                     |
    |  ADVISOR DASHBOARD                                                 |
    |    - Portfolio of 110+ students at a glance                        |
    |    - Retention alerts, program health, action queue                 |
    |    - Student detail panel with embedded Quest preview               |
    |                                                                     |
    |  ATHLETE DASHBOARD & ATHLETE QUEST                                 |
    |    - Body comp (DXA), nutrition, strength, training load            |
    |    - Eligibility matrix, APR scorecards, compliance                 |
    |    - Athletic Quest with schedule conflict detection                |
    |                                                                     |
    |  QUEST ADVISOR DASHBOARD                                           |
    |    - Advisee roster with read-only path review                     |
    |    - Suggestion/comment/meeting tools per student                  |
    |    - Notification system for path changes                          |
    |                                                                     |
    |  OPERATIONS                                                        |
    |    - Academic support, compliance, transfer portal                  |
    |    - Staff analytics, position group dashboards                     |
    +====================================================================+
```

---

## The Revolutionary Core: Simultaneous Multi-Degree Evaluation

Today at LSU (and every other university), Workday can run one degree audit at a time. One student, one program, one result. If an advisor wants to check whether a student's credits fit Marketing better than Finance, they have to run a completely separate audit. For a transfer student who might fit any of 50+ degree programs across the university, this is structurally impossible.

Ocean's `degreePathEngine.js` evaluates **every degree program simultaneously**. One click, all paths, ranked by fit score:

```javascript
// The core innovation — standardized requirement categories across ALL colleges
const REQUIREMENT_CATEGORIES = {
  GENERAL_EDUCATION: 'gen_ed',
  UNIVERSITY_REQUIREMENT: 'university',
  COLLEGE_CORE: 'college_core',
  MAJOR_REQUIREMENT: 'major_req',
  MAJOR_ELECTIVE: 'major_elective',
  MINOR_REQUIREMENT: 'minor_req',
  FREE_ELECTIVE: 'free_elective',
  CONCENTRATION: 'concentration',
};
```

Each college at LSU formats their requirements in an incompatible way. Business uses a structured checklist. Science uses dense paragraph text. Education has a completely different structure. Advisors create their own templates on top of Workday because the college formats are inconsistent.

Ocean normalizes all of them into a universal schema. The college-specific formats become irrelevant — the engine speaks one language across every program at the university.

The result for a transfer student with 72 credits:
- Finance BS: fit score 72, 3 semesters remaining
- Marketing BS: fit score 68, 3.5 semesters remaining
- Management BS: fit score 55, 4 semesters remaining
- Accounting BS: fit score 42, 5 semesters remaining
- Sport Administration BS: fit score 38, 5 semesters remaining

All computed in under one second. An advisor's 4-hour manual process, replicated across every degree at the university, instantly.

---

## The Projected/Actual Credit System

When a transfer student arrives, their credits fall into three buckets:

```
UNMAPPED  ──>  PROJECTED (advisor)  ──>  ACTUAL (registrar)
                                    ──>  DENIED (recalculate)
```

**Unmapped:** The credit exists but has no known LSU equivalent.
**Projected:** The advisor made a professional judgment call — "I know Arizona State's BCCA 300 is equivalent to ISDS 1101 based on the syllabus and two prior transfers from ASU."
**Actual:** The registrar formally approved the mapping.

The key insight: **the advisor should never be blocked by the registrar.** The degree plan works immediately with projected mappings. The registrar confirms later in the background. When they approve, projected badges turn to actual. Nothing else changes — the path was already built.

Each degree path result carries a firmness indicator:
- **FIRM** — works even if all projections are denied
- **DEPENDENT** — needs 1-2 projections approved
- **SPECULATIVE** — needs 3+ unconfirmed projections

The Quest visualization shows this uncertainty as branching futures: "Your best path depends on whether this transfer credit gets approved. Here's Plan A and Plan B."

---

## Live Section Intelligence

The scraper infrastructure (`FirecrawlScraper`) pulls live course offering data directly from `courseofferings.lsu.edu`. As of the most recent crawl, the system has:

**481 live course sections** across 10 departments for Spring 2026, with complete data for each:

| Field | Coverage | Values |
|-------|----------|--------|
| Department | 100% | ACCT (56), BLAW (5), CMST (153), ECON (72), ENTR (26), FIN (41), GBUS (4), ISDS (45), MGT (35), MKT (44) |
| Course Name | 100% | Full code + title (e.g., "ISDS 1100 Introduction to Management Information Systems") |
| Credit Hours | 100% | Typically 3; ranges exist (1-12 for research/independent study) |
| Delivery Mode | 100% | On Campus (429 sections), Web-Based (52 sections) |
| Format | 100% | Lecture (380), Research (42), Clinical (24), Recitation (16), Seminar (10), Independent Study (7), Laboratory (2) |
| Meeting Pattern | 100% | Scheduled times (360 sections) or 12:00 AM-12:00 AM async (121 sections) |
| Instructor | Present | Full names for all staffed sections |
| Enrollment/Capacity | Present | Real-time seat counts |
| Location | Present | Building and room for on-campus sections |

**Additionally scraped:**
- 7 main program pages from the LSU catalog (Finance BS, Marketing BS, Accounting BS, Economics BS, Management BS, ISDS BS, plus minors)
- 6 Gen-Ed/Integrative Learning Core approved course lists (English Composition, Math, Fine Arts, Humanities, Natural Sciences, Social Sciences) with required hours per category
- 11 department course catalog pages (complete course listings by prefix)
- 6 degree planners from older catalog editions (structured semester-by-semester templates)

The `sectionMatcher.js` engine takes courses from a degree path and finds actual available sections, parsing meeting patterns into time blocks that can be cross-referenced with the athletic schedule from Teamworks.

---

## The Athlete Dimension

For student athletes, the problem is an order of magnitude harder. An athletic academic advisor must simultaneously balance:

1. **Degree fit** — which program maps best to the student's credits
2. **Eligibility timeline** — minimum credit pace to remain NCAA eligible
3. **Compliance score** — CARA hours, APR contribution, progress-toward-degree benchmarks
4. **Schedule conflicts** — every course must not conflict with practice, film, meals, travel, mandatory study hall
5. **Graduation speed** — coaching staff wants athletes eligible and graduating on time

Ocean cross-references the complete Teamworks schedule — practice (Tu/Th 4:15-6:15 PM), strength & conditioning (Tu/W 8:30-9:30 AM), film review, position meetings, meals, travel days — with every available section's meeting pattern.

The system knows:
- A section with meeting pattern `12:00 AM - 12:00 AM` is async and will **never** conflict with practice
- Web-Based delivery mode with `75-99% Web-based` tagging means maximum flexibility
- Clinical and Research formats are inherently self-paced
- A Tuesday/Thursday 4:30 PM section **will** conflict with full practice days

For an at-risk athlete with a 1.86 GPA who needs 24 credit hours across Spring and Summer:
1. Ocean identifies the 8 courses needed
2. Cross-references with Teamworks to find conflict-free sections
3. Prioritizes Web-Based sections for maximum flexibility during season
4. Checks seat availability in real time
5. Generates a complete, conflict-free, registration-ready schedule in **one view**

The advisor batch-processing capability changes the registration season workflow. Instead of manually building schedules for 110 athletes over several weeks, the advisor runs all 110 through the engine. The dashboard shows: "47 have optimal schedules ready, 38 need manual review (section conflicts), 15 are at-risk (GPA/credit pace), 10 are new transfers needing full mapping." The advisor focuses their time on the hard cases while the clean 47 can self-register from their recommended schedule.

---

## The Quest: Dream-Driven Path Discovery

The Quest is the student-facing experience that makes this technology feel human. It's not a spreadsheet. It's not a degree audit printout. It's a visual journey.

**The front door:** A full-screen cosmic input field asks: *"Before we map your path, tell us where you want it to lead."*

The student types a dream. "I want to work at SpaceX." Or "I want to make six figures on Wall Street." Or "I want to help kids."

The `dreamMapper.js` engine resolves natural language into career clusters through keyword scoring against a rich taxonomy. "Work at SpaceX" matches to aerospace engineering, systems engineering, data science, project management — each with specific job titles, salary ranges (entry/mid/senior), top companies, required skills, and aligned degree recommendations with alignment scores.

```
Dream: "I want to work at SpaceX"
    |
    v
dreamMapper.js -> Career cluster: "Tech & Engineering"
    |                Job titles: Systems Engineer ($85k-$180k),
    |                            Data Engineer ($90k-$160k),
    |                            Project Manager ($75k-$140k)
    |                Companies: SpaceX, NASA, Lockheed Martin
    |                Skills: Systems Thinking, Python, Data Analysis
    |
    v
degreePathEngine.js -> Best-fit degrees ranked:
    |                  1. ISDS (alignment: 0.85) - data + systems
    |                  2. Management (0.60) - project leadership
    |                  3. Finance (0.45) - with analytics minor
    |
    v
pathCalculator.js -> Semester-by-semester roadmap
    |                for each viable path
    |
    v
sectionMatcher.js -> Live sections matched to next semester
    |                 with availability and conflict checks
    |
    v
QuestMap.jsx -> Visual trail with semester nodes, fork
                points, live section data, and SpaceX
                as the destination at the summit
```

**This is where the system becomes something more than an administrative tool.** A student doesn't just see "you need FIN 3715." They see their dream at the top of a mountain trail, and every semester is a node along the path to get there. Fork points show them: "Here's where you could add an analytics minor — it adds one semester but increases your SpaceX alignment from 0.45 to 0.78." The Socratic engine asks guiding questions: "What matters most to you right now — graduating faster, following your passion, or maximizing earnings?"

The what-if engine (`forkEngine.js`) lets a student say "what if I switched from Finance to Marketing?" and instantly see:
- Which credits carry over (all gen-eds, all college core, some electives)
- Which credits are lost (FIN upper-division courses don't count for MKT major requirements)
- How the graduation timeline changes
- How the career outcomes shift
- What the new semester roadmap looks like

The ripple analyzer (`rippleAnalyzer.js`) computes downstream consequences of any change: if a student fails MATH 1550, what breaks? Which future courses require it as a prerequisite? How does the graduation timeline shift? Every action has visible, computed, real consequences.

The projection engine simulates three futures — best case, likely case, risk case — creating a "probability cone" of outcomes based on the student's actual academic performance patterns.

---

## What Is Built Today

### Scraper Infrastructure (FirecrawlScraper repo)
A Python scraping framework using the Firecrawl SDK with:
- `firecrawl_client.py` — wrapper around Firecrawl for mapping, scraping, and crawling with JS rendering support
- `scrape_lsu.py` — comprehensive LSU catalog scraper with parsers for:
  - Semester-by-semester curriculum extraction
  - Course code/title/credit parsing from multiple markdown formats
  - Gen-ed category extraction with required hours
  - Marketing concentration parsing (Digital, Analytics, Professional Sales)
  - Finance track elective pool parsing (Asset Mgmt, Banking, RE, Corp Fin/IB)
  - Department course catalog extraction
  - Footnote and critical requirement parsing
- `sample_lsu_explore.py` — course offerings and degree planner scraper targeting `courseofferings.lsu.edu` and `catalog.lsu.edu/preview_degree_planner.php`

### Data Layer (Ocean repo — `src/data/`)
43+ structured data files including:
- **Degree programs:** `bs_finance.json`, `bs_marketing.json`, `bs_accounting.json`, `bs_management.json` — semester-by-semester with courses, gen-ed slots, elective pools, credit totals, concentration requirements
- **Course catalog:** `course_catalog.json` — every Business department course with descriptions, credits, prerequisites
- **Live offerings:** `lsu_new/all_offerings.json` — 481 sections for Spring 2026 with full metadata
- **Gen-ed requirements:** `gen_ed.json` — ILC categories with approved courses and required hours
- **College data:** `lsu_colleges.json` — 18 colleges, 317 majors, delivery modes
- **Career data:** `careers.json` — salary data, top companies, job titles, certifications, LSU-specific placement rates, tuition/FAFSA/debt calculations
- **Dream clusters:** `dream_clusters.json` — natural language dream resolution with career clusters, keyword taxonomy, job titles, salary ranges, skill signatures, major recommendations
- **Transfer equivalencies:** `transfer_equivalencies.json` — school-specific and generic course mappings
- **Mock system data:** `workday_mock.json` (student records with the actual Workday inaccuracies documented), `moodle_mock.json` (real-time grades showing Workday/Moodle discrepancy), `teamworks_mock.json` (full football weekly schedule with CARA tracking)
- **Credential catalog:** `cert_catalog.json`, `lsu_credentials.json` — certifications, minors, micro-credentials that stack on top of degree paths
- **Operations data:** 18 JSON files covering depth charts, recruiting pipelines, combine benchmarks, NIL valuations, mental health support, game week operations, staff models
- **Roster data:** Men's and women's basketball rosters with per-player APR fields

### Engine Layer (Ocean repo — `src/utils/`)
28 JavaScript engine modules:
- `degreePathEngine.js` — the core: normalizes college templates, maps credits to all degrees simultaneously, ranks paths by fit + career + compliance
- `creditMappingEngine.js` — projected/actual system with auto-mapping from equivalency tables
- `sectionMatcher.js` — matches degree requirements to live course sections, parses meeting patterns, scores by athlete-friendliness
- `scheduleConflictEngine.js` — cross-references Teamworks athletic schedule with course meeting patterns
- `scheduleOptimizer.js` — builds optimal conflict-free schedule
- `pathCalculator.js` — generates detailed semester roadmap from a selected path
- `projectionEngine.js` — forward simulation with best/likely/risk scenarios
- `rippleAnalyzer.js` — downstream consequence engine for add/drop/fail events
- `degreeGraph.js` — directed acyclic graph of prerequisite chains with critical path analysis
- `forkEngine.js` — what-if scenario calculator (switch major, add minor, skip semester, add summer, change dream)
- `dreamMapper.js` — natural language dream resolution to career clusters
- `socraticEngine.js` — Socratic conversation state machine for guided discovery
- `roiCalculator.js` — tuition, debt, salary, 5-year ROI projection with FAFSA integration
- `courseEnricher.js` — enriches course codes with descriptions, prerequisites, gen-ed flags
- `credentialEngine.js` — recommends certifications and micro-credentials aligned to career targets
- `bridgeRecommender.js` — recommends "bridge" courses that connect current major to dream career
- `gpaEngine.js` — GPA calculations, projections, eligibility thresholds
- `athleteQuestMapper.js` — athlete-specific path computation with compliance scoring
- `athleteForkEngine.js` — athlete what-if scenarios with eligibility impact
- `cohortAnalytics.js` — advisor portfolio analytics across student cohorts
- `studentState.js` — immutable state model for a student's academic position
- `transitionEngine.js` — state machine for term-to-term progression with graduation checks
- `questDataStore.js` — SQL.js (WASM SQLite in browser) persistence for quest paths, sharing, suggestions
- `mapGenerator.js` — converts path data to visual trail coordinates for the Quest SVG
- Plus: `advisorEngine.js`, `aiEconomyEngine.js`, `dataLoader.js`, `chatParser.js`, `savedPathsStore.js`, `semesterUtils.js`, `prereqParser.js`, `questDegreeAdapter.js`, `questRippleAdapter.js`, `recoveryPlanner.js`, `riskModel.js`, `roadmapBuilder.js`, `supportFlowEngine.js`

### UI Layer (Ocean repo — `src/components/`)
100+ React components across 9 integrated views:
- **Quest system:** 28 components — dream input, trail map with GSAP 3D camera, semester nodes, fork points, path comparison, Socratic chat, social proof, what-if cards, destination markers, zoom controls, constellation map, share functionality, advisor toolbar, sidebar, bottom bar
- **Advisor system:** 10 components — dashboard, student table, portfolio summary, program health, retention alerts, action queue, student detail panel, support flow modal, professor messaging
- **Athlete system:** 23 components — full athlete dashboard with DXA body composition, nutrition, strength, training load, readiness, risk scoring, course schedule, eligibility cards/matrix, APR scorecards, position benchmarks, position group dashboard, staff analytics, roster table, workout recovery, athlete-specific quest view with compare/fork/share
- **Dashboard system:** 12 components — semester roadmap, course list, course options, career targeting, interactive stats, major stats, path hero, ROI drawer, transfer credit map, what-if impact, risk dashboard, academic signals, advisor actions
- **Mapping system:** 6 components — degree mapping orchestrator, transfer intake, manual mapper, degree roadmap, schedule builder, approval queue
- **Operations system:** 4 components — operations dashboard, academic support, compliance, transfer portal
- **Demo system:** 2 components — day-in-the-life walkthrough, demo view
- **Shared components:** animated numbers, collapsible sections, course cards, major dropdowns, progress rings, system source tags, advisor info

---

## What Comes Next: The Connectors

The system is built on mock data that mirrors the exact structure and messiness of the real systems. The architecture is designed so that replacing a mock import with a live API call changes nothing about the computation — only the data source.

### Immediate Connectors Needed

| Connector | What It Replaces | What It Enables |
|-----------|-----------------|-----------------|
| **Workday Student API** | `workday_mock.json` | Real transcripts, real degree audits, real enrollment status. The mock already models Workday's known inaccuracies (120 hours shown, 65 actually counting). |
| **Moodle REST API / LTI** | `moodle_mock.json` | Real-time grades that expose the Workday discrepancy. The mock shows a student at 66.33% in Moodle while Workday says B+. |
| **Teamworks API** | `teamworks_mock.json` | Live practice schedules, travel calendars, CARA hour tracking. The mock models a full football game week with every event type. |
| **Workday Schedule of Classes** (live feed) | `all_offerings.json` (scraped) | Real-time section availability instead of point-in-time scrapes. Enables registration-day seat tracking. |

### Future Connectors

| Connector | Purpose |
|-----------|---------|
| **Banner** (where it exists) | Historical student data that Workday doesn't have |
| **SAM** (Student Athlete Management) | Eligibility rules and compliance thresholds integrated directly into path scoring |
| **EAB Navigate** | Early alert data, professor feedback with grade direction indicators |
| **Transfer equivalency database** (Registrar) | Official school-to-school course mappings. Currently modeled in `transfer_equivalencies.json` as institutional knowledge built from advisor experience |
| **Historical enrollment data** (2-3 semesters) | Seat pressure intelligence: "This section fills every Fall by Week 1" |
| **Grade distribution data** | Per-instructor GPA averages: "Dr. Walsh's section has a 2.8 average vs Dr. Chen's 3.2" |
| **All-department offerings** | Currently have 10 Business departments + CMST. Need MATH, ENGL, BIOL, CHEM, PHYS, HIST, ART, and every other gen-ed supplier |
| **Multi-term offerings** | Currently have Spring 2026 only. Need Summer 2026, Fall 2026+ for full path planning |

---

## The LLAMA / META Partnership Vision

The current system runs on deterministic engines — pure functions, graph algorithms, pattern matching, scoring heuristics. This is by design: every path recommendation is **verifiable**. No hallucination. No approximation. A student can trace exactly why each course appears in each semester of their recommended path.

LLAMA integration enters at a specific, bounded layer:

### Where LLAMA Fits

1. **Dream Resolution (Enhanced):** The current `dreamMapper.js` uses keyword scoring against a fixed taxonomy. LLAMA replaces this with genuine natural language understanding. "I want to work on rockets but also understand the business side" resolves to a nuanced, multi-cluster career target that the keyword system would miss.

2. **Quest Trail Guide:** The Socratic engine currently uses pre-built question trees. LLAMA enables genuine conversational guidance: "You mentioned wanting flexibility — have you considered that adding a Data Analytics minor only adds 15 hours but opens up 23 additional job categories with a median $12k salary premium?"

3. **External Job Market Intelligence:** This is where the META partnership becomes transformative. LLAMA processes real-time job postings, skill requirements, company hiring patterns, and labor market signals from external data sources. The system moves from "here are typical Finance careers" to "SpaceX posted 14 entry-level positions last quarter requiring Python, systems engineering, and financial modeling — here's the exact course combination across the Engineering and Business colleges that covers all three skill requirements."

4. **Cross-College Path Optimization:** When the system can see every degree program at the university, LLAMA identifies non-obvious combinations: "A student targeting SpaceX should take Engineering systems courses as technical electives in their Business degree, add a Data Science minor from the College of Science, and take the Project Management certification from Continuing Education. This combination is unusual but maps to 92% of SpaceX's stated skill requirements."

### Where LLAMA Does NOT Fit

LLAMA does **not** replace the degree mapping engine, the credit evaluator, the schedule conflict detector, or any of the core computation. Those remain deterministic and verifiable. A student's degree path is too consequential to be generated by a language model — it must be computed from actual requirements, actual credits, actual section availability.

LLAMA sits at the **inspiration layer** (dream interpretation, career discovery, conversational guidance) and the **intelligence layer** (external market data processing, non-obvious pattern recognition across the full university catalog). The **verification layer** (is this path actually valid?) always runs through the deterministic engines.

---

## The Vision: Breaking the Old Way of Thinking

The university as it exists today forces students into a linear, siloed path. You pick a major. You follow the prescribed 8-semester plan. Your advisor can only see one degree at a time. If you want to explore, you're on your own — there is no tool that shows you what happens if you switch, what you'd lose, what you'd gain, how long it would take.

Ocean breaks this in three fundamental ways:

### 1. Every Path, Simultaneously

A student's credits don't belong to one degree. They satisfy requirements across dozens of programs. Ocean shows this for the first time. A student who thinks they're "stuck" in Sport Administration discovers their 72 transfer credits map better to Marketing (fit: 72%) than the program they're currently in (fit: 38%). This is not a hypothetical — this is a real scenario from the advisor discovery sessions.

### 2. Dream-First, Not Catalog-First

The old way: open the catalog, browse majors alphabetically, pick one, hope it leads somewhere good. The Ocean way: tell the system where you want to end up. The system works backward from the destination to build the path. A student who dreams of SpaceX doesn't start by choosing "Mechanical Engineering." They start with the dream, and the system reveals that a combination of ISDS courses, Engineering electives, a Data Science minor, and a Project Management certification creates a stronger profile than any single major alone.

### 3. Real-Time, Verified, Actionable

Not "you should take Finance courses." Instead: "FIN 3715 Section 002 is Web-Based, has 8 seats remaining, doesn't conflict with your Tuesday/Thursday practice, and satisfies your Principles of Finance requirement. Tap to add it to your schedule." Every recommendation is backed by live section data, real seat availability, real schedule conflict analysis, and verified degree requirement mapping.

This means a student on the Quest can say: "What if I changed to Marketing?" — and within seconds see:
- The complete Marketing degree path mapped against their existing credits
- Which courses they've already completed that count
- Which new courses they need, with live sections available next semester
- How their graduation timeline changes
- What career outcomes shift
- Whether the path is FIRM (definitely works) or DEPENDENT (needs a transfer credit approved)

That is not a suggestion. That is not a chatbot response. That is a computed, verified, section-level, seat-available, conflict-checked, compliance-scored degree path — generated in real time from the actual systems the university runs on.

---

## The Competitive Position

No university in the country has this.

Workday's native degree audit runs one program at a time. Degree Works (Ellucian) does the same. EAB Navigate provides early alerts but doesn't build paths. Stellic offers degree planning but doesn't integrate with athletic scheduling, live sections, or career outcomes. None of them process natural language dreams. None of them run forward simulations. None of them compute ripple effects. None of them cross-reference with Teamworks.

Ocean is not an improvement to an existing category. It is a new category: **dream-driven, multi-path, real-time academic intelligence** — verified against live data, optimized for the most constrained users (student athletes), and extensible to every student at the university.

The recruiting advantage alone changes the game. A high school senior visits LSU. They're shown a personalized Quest based on their AP credits and career dream. No other school on their visit list can do this. The recruit sees their exact path to graduation, their exact career outcomes, their exact first semester schedule — before they've even committed.

When the META partnership brings in external job market data and LLAMA powers the dream interpretation and cross-college optimization, Ocean becomes not just the best tool at one university — it becomes the platform that every university needs and none of them have.

---

## Appendix: Repository Inventory

### FirecrawlScraper Repository
```
scraper/
  config.py              - Environment config (API keys, settings)
  firecrawl_client.py    - Firecrawl SDK wrapper (map, scrape, crawl, JS rendering)
  io_utils.py            - JSON/JSONL file writers

scrape_lsu.py            - Main LSU catalog scraper (24 target URLs, full parsing)
sample_lsu_explore.py    - Course offerings + degree planner scraper (17 targets)

out/lsu/                 - Original catalog scrape output
  bs_finance.json        - Finance BS degree data
  bs_marketing.json      - Marketing BS degree data
  course_catalog.json    - Department course listings
  gen_ed.json            - Gen-ed category data
  lsu_degrees.json       - Combined degree data
  lsu_degrees.jsonl      - Line-delimited degree records
  raw_pages.json         - Raw scraped markdown

out/lsu_course_offerings/ - Live section data (structured)
  all_offerings.json      - 481 sections, all departments combined
  all_offerings.jsonl     - One record per section
  offerings_*.json        - Per-department section files (11 departments)
  degree_planners.json    - 6 degree planners from older catalogs
  raw_pages.json          - Raw scraped markdown

out/lsu_new/              - Clean export for Ocean consumption
  (same structured files as lsu_course_offerings, without raw data)
```

### Ocean Repository
```
219 source files
100+ React components across 9 views
28 computation engine modules
43+ structured data files
WASM SQLite persistence layer (sql.js)
Vite 5 + React 18 + Tailwind CSS 4 + Framer Motion + GSAP
```

### Data Coverage Summary
| Category | Items | Source |
|----------|-------|--------|
| Degree programs (detailed, semester-by-semester) | 4 | LSU Catalog scrape |
| Degree programs (template-level) | 6 colleges | Manual + catalog |
| Total majors cataloged | 317 | lsu_colleges.json |
| Live course sections (Spring 2026) | 481 | courseofferings.lsu.edu |
| Departments with live data | 10 | Course offerings scrape |
| Career clusters with job data | 8+ | dream_clusters.json |
| Career salary/outcome records | 6+ majors | careers.json |
| Transfer equivalency mappings | Multi-school | transfer_equivalencies.json |
| Gen-ed approved course lists | 6 categories | LSU Catalog scrape |
| Operations data schemas | 18 | operations/ directory |
| Student mock profiles | 2+ | workday_mock.json |
| Athletic schedule (full week) | 1 sport | teamworks_mock.json |
| Moodle grade records | 2+ students | moodle_mock.json |
| Degree planners (legacy) | 6 | catalog.lsu.edu |
