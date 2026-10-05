import { BlogPost } from "@/types/blog";

export const subtopicChecklistJeeNeet: BlogPost = {
  slug: "subtopic-checklist-jee-neet",
  title: "The Subtopic Checklist: How to Track JEE & NEET Syllabus Down to Micro-Concepts",
  description:
    "Why broad chapter checklists fail competitive exam aspirants, and how a 4-milestone subtopic tracking system (NCERT, PYQs, Modules, Mocks) guarantees 99+ percentile depth.",
  publishedAt: "2026-10-01",
  readingTime: "7 min read",
  author: {
    name: "Naman Katiyar",
    role: "Founder, OJEE-Tracker",
  },
  category: "Strategy & Planning",
  tags: ["JEE Main", "NEET UG", "Syllabus Tracker", "Study Checklist", "Subtopics"],
  targetExam: "JEE & NEET",
  coverImage: "/blog/covers/subtopic-checklist.png",
  coverImageAlt: "Subtopic syllabus checklist for JEE and NEET students",
  featured: true,
  tableOfContents: [
    { id: "the-chapter-checklist-trap", title: "The High-Level Chapter Trap", level: 2 },
    { id: "the-4-milestone-framework", title: "The 4-Milestone Verification Framework", level: 2 },
    { id: "subject-breakdown-examples", title: "Real-World Subject Breakdown: Rotational Dynamics & GOC", level: 2 },
    { id: "tracking-tools-comparison", title: "Paper Checklists vs Notion vs OJEE-Tracker", level: 2 },
    { id: "action-plan", title: "Step-by-Step Implementation Guide", level: 2 },
  ],
  content: `
When students begin their JEE or NEET preparation, nearly everyone prints out the official syllabus syllabus PDF or buys a generic wall poster with 90 chapter checkboxes.

Three months before the exam, they tick "Rotational Motion" or "Electrochemistry" because they attended coaching lectures and solved 20 homework questions. But on exam day, when a question couples *Moment of Inertia of a composite cone* with *pure rolling on an inclined plane*, their score plummets.

The culprit isn't low intelligence or lack of effort—it's **shallow syllabus tracking**.

---

## The High-Level Chapter Trap

Generic syllabus checklists treat a massive 30-hour topic like **Thermodynamics** as a single binary checkbox: \`[Done / Not Done]\`.

In reality, a chapter is an ecosystem of 8 to 15 distinct conceptual micro-topics. For example, in **Ray Optics**, your mastery isn't uniform:
- *Refraction at plane surfaces*: High mastery (95% accuracy)
- *Total Internal Reflection & Prisms*: Medium mastery (70% accuracy)
- *Refraction at spherical surfaces & Lens Maker's Formula*: High mastery
- *Optical Instruments (Telescopes & Microscopes)*: Completely forgotten or unattempted!

> [!WARNING]
> Testing agencies like NTA specifically design questions around the neglected tail-end subtopics (e.g., Optical Instruments, Damped Oscillations, Principles of Qualitative Analysis) to separate top 1% percentiles from average rankers.

If your study tracking system operates only at the chapter level, you will suffer from **the illusion of competence**: you feel the chapter is "complete", but critical testable subtopics remain completely unrevised.

---

## The 4-Milestone Verification Framework

To achieve genuine examination depth, every single subtopic must pass through four independent verification checkpoints:

| Milestone Checkpoint | Core Objective | Evidence of Mastery |
|---|---|---|
| **1. NCERT / Theory** | Concept absorption & foundational definitions | Summarized notes written, NCERT in-text problems solved |
| **2. PYQs (Last 10 Years)** | Deciphering NTA/IIT question patterns | Minimum 30 PYQs solved without looking at solution manuals |
| **3. Coaching Modules** | Multi-concept application & speed drill | Level-1 and Level-2 exercise questions completed |
| **4. Chapter Mock Test** | Performance under timed exam pressure | Timed 45-min chapter test with >75% accuracy |

Until all 4 milestones are marked complete, a subtopic cannot be deemed exam-ready.

---

## Real-World Subject Breakdown: Rotational Dynamics & GOC

Let's see how granular subtopic tracking works in practice for two of the toughest chapters in JEE and NEET:

### 1. Physics: Rotational Dynamics
Instead of a single checkbox, break it down:
- **Subtopic 1: Center of Mass & Collision Dynamics** (Milestones: NCERT ✓ | PYQ ✓ | Modules ✓ | Mock Tests ✓)
- **Subtopic 2: Moment of Inertia of Standard & Composite Bodies** (Milestones: NCERT ✓ | PYQ ✓ | Modules ✓ | Mock Tests ✗)
- **Subtopic 3: Torque & Angular Equilibrium (Ladder & Hinge problems)** (Milestones: NCERT ✓ | PYQ ✓ | Modules ✗ | Mock Tests ✗)
- **Subtopic 4: Angular Momentum & Conservation Principles** (Milestones: NCERT ✓ | PYQ ✗ | Modules ✗ | Mock Tests ✗)
- **Subtopic 5: Pure Rolling & Rolling with Slipping** (Milestones: NCERT ✓ | PYQ ✗ | Modules ✗ | Mock Tests ✗)

### 2. Chemistry: General Organic Chemistry (GOC)
- **Subtopic 1: Inductive, Mesomeric & Hyperconjugation Effects**
- **Subtopic 2: Aromaticity, Anti-Aromaticity & Huckel's Rule**
- **Subtopic 3: Carbocation, Carbanion & Radical Stability**
- **Subtopic 4: Acidic & Basic Strength Trends in Organic Compounds**
- **Subtopic 5: Tautomerism & Keto-Enol Equilibrium**

When you log progress at this granular level, your revision schedule creates itself. You never wake up wondering *"What should I study today?"* You look at your matrix, see that *Pure Rolling* lacks PYQs, and immediately sit down with 20 targeted problems.

---

## Paper Checklists vs Notion vs OJEE-Tracker

| Feature | Paper Wall Posters | Notion / Excel Spreadsheets | OJEE-Tracker |
|---|---|---|---|
| **Subtopic Granularity** | Impossible (Poster too small) | High, but 10+ hours manual typing | Pre-loaded out of the box |
| **Milestone Tracking (4-Steps)** | Messy pen markings | Requires complex relational tables | 1-Click interactive toggles |
| **Time & Focus Integration** | None | Requires external timer widget | Built-in Pomodoro & Stopwatch |
| **Mobile Access** | Zero portability | Heavy, laggy on phones | Offline-First Instant PWA |
| **Pricing & Distractions** | Cheap, but static | Free/Paid, clunky setup | 100% Free Forever, Zero Ads |

---

## Step-by-Step Implementation Guide

1. **Audit your current standing**: Open your ongoing chapters and list their top 5 subtopics.
2. **Apply the 4-milestone rule**: Honestly check whether you have solved the last 5 years of PYQs for each subtopic.
3. **Pinpoint your red zones**: Mark any subtopic with less than 2 milestones as an emergency revision block.
4. **Automate your tracking**: Switch to a distraction-free digital cockpit like [OJEE-Tracker](https://tracker.ojeet.tech) to save hours of manual logging.
`,
  faqs: [
    {
      question: "How many subtopics should a chapter ideally be divided into?",
      answer:
        "Typically between 4 to 8 conceptual subtopics per chapter. Dividing a chapter into more than 10 subtopics causes micromanagement fatigue, while fewer than 3 creates blind spots.",
    },
    {
      question: "Does OJEE-Tracker include the updated 2026/2027 NTA syllabus?",
      answer:
        "Yes! OJEE-Tracker comes pre-loaded with the latest rationalized syllabi for JEE Main, JEE Advanced, and NEET UG, with deleted topics already removed.",
    },
    {
      question: "Is the syllabus tracker available offline?",
      answer:
        "Yes, all syllabus milestone toggles are saved locally in your browser storage (IndexedDB), allowing you to tick off items in airplane mode without internet.",
    },
  ],
};
