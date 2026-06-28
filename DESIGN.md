---
name: OJEE-Tracker Landing Page
description: Premium high-density study command centre landing page
---

<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

# Design System: OJEE-Tracker Landing Page

## 1. Overview

**Creative North Star: "The Obsidian Command Deck"**

The OJEE-Tracker landing page uses a high-contrast, pure-black interface that replicates a premium, high-density study dashboard. Visual depth is established through sharp glassmorphic sheets and borders rather than glowing drop shadows. Layouts are clean and dense, emphasizing organized tracking widgets, syllabus countdowns, and bento-grid analytics. 

**Key Characteristics:**
- Pure black base canvases for complete visual focus.
- High-contrast typography featuring custom display faces with tight tracking.
- Absence of warm tints, glow effects, or decorative drop-shadow gradients.

## 2. Colors

The color palette is strictly high contrast, minimalist, and cool.

### Primary
- **Obsidian Black** (#000000): The absolute background canvas color.
- **Pure White** (#ffffff): Text, primary UI boundaries, and high-visibility elements.

### Accent
- **Tech Azure** (#007FFF): Used for small status chips, highlight pills, and minimal focused interactions.

### Named Rules
**The No-Glow Rule.** No neon glows, shadow rings, or radial gradient background glows are allowed anywhere. All boundaries must be defined by high-precision, low-opacity lines or sharp layout breaks.

## 3. Typography

**Display Font:** Outfit
**Body Font:** Geist

**Character:** High-precision, clean geometric sans-serif pairing. Display elements use tight letter-spacing for a modern, dashboard-command look.

### Hierarchy
- **Display** (Bold, clamp(2.5rem, 5vw, 4.5rem), line-height: 1.1, letter-spacing: -0.02em): Hero page headings.
- **Headline** (SemiBold, 2rem, line-height: 1.25, letter-spacing: -0.01em): Section headers.
- **Title** (Medium, 1.25rem, line-height: 1.5): Component cards and widget headers.
- **Body** (Regular, 1rem, line-height: 1.6): Standard text and descriptions. Max width 65ch.
- **Label** (Medium, 0.875rem, letter-spacing: 0.05em, uppercase): Button triggers, metrics labels, and indicators.

## 4. Elevation

OJEE-Tracker does not use soft shadows. Depth is achieved via transparency, crisp layout grid lines, and crisp backdrop-filters.

### Named Rules
**The Border-Only Depth Rule.** Depth is created using low-opacity borders (e.g., `border-white/10` or `border-white/15`) and backdrop-filter blurs, not box shadows.

## 5. Components

<!-- Components omitted during initial seeding. Re-run /impeccable document once components are implemented. -->

## 6. Do's and Don'ts

### Do:
- **Do** keep the background pure black (#000000).
- **Do** use Outfit with tight letter-spacing (`tracking-tight`) for major titles and headings.
- **Do** use thin, semi-transparent borders (`border-white/10`) to separate bento cards and layouts.
- **Do** support reduced motion preferences with instant layout transitions.

### Don't:
- **Don't** use any glow effects, neon glow rings, or drop shadows.
- **Don't** use over-the-top, slow, or dizzying glassmorphism animations. Keep transitions sharp and snappy.
- **Don't** default to warm neutrals (cream, beige, off-white background canvases).
