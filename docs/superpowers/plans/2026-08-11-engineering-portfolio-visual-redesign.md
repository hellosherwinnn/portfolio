# Engineering Portfolio Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the portfolio as a calm engineering archive and replace the experience rows with an accessible vertical timeline.

**Architecture:** Keep Astro pages, routes, content collections, and data unchanged. Centralize visual tokens in `global.css`, reuse the existing workflow graphic as the hero asset, and give each existing component a focused visual update. The experience list remains semantic as an ordered list while its presentation becomes a timeline.

**Tech Stack:** Astro 7, scoped component CSS, CSS custom properties, Vitest, Playwright, axe-core.

## Global Constraints

- Preserve facts, route slugs, anchors, navigation labels, URLs, and accessible labels.
- Use dark graphite, one ice-blue accent, 12px content surfaces, and pill-only controls.
- No em dash characters in visible copy.
- Preserve keyboard navigation and honor `prefers-reduced-motion`.
- Work directly on `main` with the user's explicit authorization.

---

### Task 1: Add timeline regression coverage

**Files:**
- Modify: `tests/e2e/navigation.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`

**Interfaces:**
- Consumes: existing `#experience` section and `ExperienceTimeline.astro` ordered-list markup.
- Produces: browser coverage for the timeline role list and its narrow-screen layout.

- [ ] **Step 1: Write the failing browser test**

```ts
test('experience is presented as a vertical timeline', async ({ page }) => {
  await page.goto('/#experience');
  await expect(page.locator('#experience .experience-list')).toHaveAttribute('data-layout', 'timeline');
  await expect(page.locator('#experience .experience-list > li')).toHaveCount(3);
  await expect(page.locator('#experience .timeline-marker')).toHaveCount(3);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx playwright test tests/e2e/navigation.spec.ts --grep "vertical timeline"`

Expected: FAIL because the timeline data attribute and markers do not exist.

- [ ] **Step 3: Implement the semantic timeline markup and styles**

Add `data-layout="timeline"` and a `.timeline-marker` to each timeline list item. Use one rule via `::before`, date markers at the left edge, and a single-column mobile fallback.

- [ ] **Step 4: Run the targeted test to verify it passes**

Run: `npx playwright test tests/e2e/navigation.spec.ts --grep "vertical timeline"`

Expected: PASS.

### Task 2: Establish global engineering-archive tokens

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/SiteHeader.astro`
- Modify: `src/components/SiteFooter.astro`

**Interfaces:**
- Consumes: existing `--color-*`, `--space-*`, `.page-shell`, skip-link, and header/footer class names.
- Produces: theme variables, color-scheme support, shared motion behavior, and consistent shell styling.

- [ ] **Step 1: Write the failing source-level assertions**

Add assertions to `tests/unit/site-data.test.ts` requiring `--surface`, `--accent`, `prefers-color-scheme`, and `prefers-reduced-motion` in `global.css`.

- [ ] **Step 2: Run the unit test to verify it fails**

Run: `npm test -- tests/unit/site-data.test.ts`

Expected: FAIL because the new semantic theme tokens do not exist.

- [ ] **Step 3: Implement tokens and shell restyling**

Create semantic light and dark variables, retain the existing public class contracts, use transform and opacity-only interaction transitions, and keep a clearly visible focus ring.

- [ ] **Step 4: Run the targeted unit test to verify it passes**

Run: `npm test -- tests/unit/site-data.test.ts`

Expected: PASS.

### Task 3: Recompose the home page and project archive

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/components/ProjectFeature.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/components/About.astro`
- Modify: `src/components/CapabilitiesGrid.astro`

**Interfaces:**
- Consumes: `WorkflowDiagram.astro`, existing project collection data, current `#work`, `#about`, and `#experience` anchors.
- Produces: asymmetric hero with a first-party workflow visual and varied archive composition for the three case studies.

- [ ] **Step 1: Write failing layout assertions**

Add Playwright checks asserting `.hero-visual` is visible, three project features have distinct variant classes, and the hero has no horizontal overflow at 360px.

- [ ] **Step 2: Run the targeted browser test to verify it fails**

Run: `npx playwright test tests/e2e/responsive.spec.ts --grep "archive visual"`

Expected: FAIL because `.hero-visual` is absent.

- [ ] **Step 3: Implement the home-page visual composition**

Reuse the road-traffic workflow graphic in a right-side hero panel. Refresh typography, spacing, project media framing, project variants, about, and capabilities without changing text, links, metrics, or headings.

- [ ] **Step 4: Run targeted browser coverage to verify it passes**

Run: `npx playwright test tests/e2e/responsive.spec.ts --grep "archive visual"`

Expected: PASS.

### Task 4: Carry the visual system into case studies and verify

**Files:**
- Modify: `src/layouts/CaseStudyLayout.astro`
- Modify: `src/components/CaseStudyHeader.astro`
- Modify: `src/components/MetricStrip.astro`
- Test: `tests/e2e/accessibility.spec.ts`

**Interfaces:**
- Consumes: existing case-study routes and semantic headings.
- Produces: visually consistent case studies with unchanged content and accessible navigation.

- [ ] **Step 1: Write the failing browser test**

Add a test that checks a case study has the `.case-study` archive treatment and retains a visible `Case study navigation` landmark.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx playwright test tests/e2e/navigation.spec.ts --grep "archive treatment"`

Expected: FAIL because the archive treatment hook is absent.

- [ ] **Step 3: Implement the focused case-study refinements**

Add the hook and apply the shared token rhythm to headings, metrics, media, body copy, and previous/next navigation. Do not alter content or route behavior.

- [ ] **Step 4: Run all validation**

Run: `npm run check; npm test; npm run test:e2e; npm run build`

Expected: Astro reports zero errors, Vitest passes, Playwright passes, and the static build completes.

- [ ] **Step 5: Perform visual and accessibility review**

Inspect home and a case study at 360px and desktop widths, in light and dark color schemes, plus reduced motion. Confirm no horizontal overflow, visible focus, timeline readability, and no serious axe violations.
