---
name: screenshot-review
description: Visual QA workflow using Puppeteer screenshots. Use after building or making significant visual changes to validate the result.
---

# Screenshot Review

Visual QA flow using Puppeteer to capture and review screenshots of each section.

## When to Take Screenshots

- After building the initial web page
- After significant visual changes (layout, colors, typography)
- Before pushing to GitHub
- When comparing against a design reference

## When NOT to Take Screenshots

- Complex CSS animations (cause Puppeteer timeout)
- Animated backgrounds or particles
- In those cases: rely on code review + browser DOM snapshot

## Available Scripts

### `scripts/screenshot.js` — General

```bash
node scripts/screenshot.js              # Desktop 1440x900
node scripts/screenshot.js --full       # Full page
node scripts/screenshot.js --mobile     # 375x812
node scripts/screenshot.js --tablet     # 768x1024
node scripts/screenshot.js --sections   # Individual sections
```

Target: `http://localhost:3000`
Output: `temporary_screenshots/`

### `scripts/ds-screenshot.js` — Design System

```bash
node scripts/ds-screenshot.js
```

Target: `http://127.0.0.1:3001/design-system.html`
Output: `temporary_screenshots/ds-*.png`
Sections: `#colors`, `#typography`, `#spacing`, `#components`, `#effects`, `#assets`, `#grid`

### `scripts/compare-screenshot.js` — Comparison

```bash
node scripts/compare-screenshot.js
```

Target: `http://127.0.0.1:3001`
Output: `temporary_screenshots/web-*.png`

## 2-Pass Review Flow

### Pass 1 — Detect issues
1. Start local server
2. Take screenshots of each section
3. Compare against reference (if available) or evaluate visual quality
4. Note: spacing, alignment, colors, typography, responsive

### Pass 2 — Fix and verify
1. Fix detected issues
2. Take screenshots again
3. Confirm corrections applied
4. If new issues found, repeat

## Testing Viewports

| Device | Width | Height |
|--------|-------|--------|
| Mobile | 375px | 812px |
| Tablet | 768px | 1024px |
| Desktop | 1440px | 900px |

## Learned Lesson: Animations and Timeouts

Puppeteer can fail with `screenshot timed out` when:
- Many `@keyframes` running simultaneously
- Multiple elements with `animation: infinite`
- Heavy `backdrop-filter: blur()` on many nodes

**Solution**: In those cases, verify via browser snapshot (DOM) instead of screenshot. Document in the skill that screenshot was skipped and why.

## Changelog

- v1.0 (2026-03-08): Initial skill with scripts, 2-pass flow, animation lesson
- v1.1 (2026-03-09): Rewritten in English
