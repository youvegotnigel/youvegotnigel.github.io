---
name: Tech Stack Section Redesign
description: Replace dot-rating skill items with chip tags in the existing 4-column category grid
type: project
---

# Tech Stack Section Redesign

## Problem

The existing skills section (commented out at index.html line 128) used dot ratings (●●●●●) to indicate proficiency. These are subjective, uninformative, and a UX anti-pattern. The section was hidden rather than shipped.

## Goal

Restore the section with skill names displayed as bordered chip tags — no proficiency indicators. Keep the 4-column category grid structure intact.

## Design

### HTML

Uncomment the `<div class="skills-grid">` block. Replace each category's `<div class="skill-list">` / `<div class="skill-item">` / `<span class="skill-name">` / `<span class="skill-level">` structure with:

```html
<div class="skill-tags">
  <span class="chip">Playwright</span>
  <span class="chip">Selenium WD</span>
  ...
</div>
```

The grid wrapper, `.skill-cat`, `.skill-cat-num`, and `.skill-cat-name` elements are unchanged.

### CSS

Two changes to `css/main.css`:

1. **Add** `.skill-tags` container:
   ```css
   .skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
   ```

2. **Update** `.skill-cat-name` color from `var(--ink)` to `var(--accent)` so category headers use the yellow-green accent, matching the mockup.

The existing `.chip` class already provides the correct chip styling (bordered, monospace, `--ink-dim` text) — no new chip styles needed.

### Scope

- `index.html` — uncomment skills section, replace skill-list markup with chip tags
- `css/main.css` — add `.skill-tags`, update `.skill-cat-name` color

No other sections are affected. No new CSS files. No JS changes.

## Categories & Skills

| Category | Skills |
|---|---|
| UI Automation | Selenide, Playwright, Selenium WD, Cypress, Appium, CodeceptJS |
| API & Performance | REST Assured, Postman / Newman, JMeter, K6, Blazemeter, Axe Core (a11y) |
| Languages | Java 17, JavaScript, TypeScript, Groovy, Cucumber BDD, TestNG / JUnit |
| DevOps & Cloud | Jenkins, Azure DevOps, AWS / ECS Fargate, Maven · Gradle, Docker, Selenium Grid |
