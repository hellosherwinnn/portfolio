# Compact White Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the diagram-heavy, over-spaced homepage with a compact white recruiter portfolio whose content is fully verified against Zhengjie's master CV.

**Architecture:** Keep the existing Astro routes, content collection, case-study pages, and anchor IDs. Recompose the homepage from focused Astro components: a concise hero, a CV-backed career timeline, compact project records, grouped skills, and one contact surface. Use native component-scoped CSS plus semantic global variables; do not add dependencies.

**Tech Stack:** Astro 7, TypeScript 6, native CSS, Vitest, Playwright, GitHub Pages-compatible static output.

## Global Constraints

- Treat the master CV reference under `sources/` as the only factual source and never modify anything under `sources/`.
- Public display name is exactly `Zhengjie`; never show a full legal name or invent Bosch experience.
- Theme is white-dominant with near-black text, muted cool gray, and one cold-blue accent.
- Do not show workflow diagrams, unexplained numbered steps, fake dashboards, fake screenshots, fake percentages, or unverified metrics.
- Keep `/`, `/work/bakery-ai-analytics`, `/work/road-traffic-auralization`, `/work/spoken-digit-cnn`, `#work`, `#experience`, existing nav labels, and keyboard access stable.
- Use regular hyphens in visible date ranges and separators. Do not introduce em-dashes or en-dashes.
- Below 768 px, all split layouts collapse to one column with no horizontal overflow.

## File Structure

- Modify `src/data/experience.ts`: canonical work, education, and training records with exact CV dates.
- Modify `src/data/site.ts`: retain identity and links; align navigation with the compact homepage without changing labels.
- Modify `src/components/Hero.astro`: identity-first hero with no project-specific media.
- Modify `src/components/ExperienceTimeline.astro`: compact chronological records without item indexes or decorative markers.
- Modify `src/components/ProjectFeature.astro`: compact horizontal project record; no workflow or empty media column.
- Modify `src/components/MetricStrip.astro`: dense labelled metrics that communicate verified values.
- Modify `src/components/CapabilitiesGrid.astro`: grouped skill lists without scoring.
- Modify `src/components/SiteHeader.astro`: compact single-line navigation.
- Modify `src/components/SiteFooter.astro`: one concise contact surface.
- Modify `src/pages/index.astro`: reorder sections and remove standalone About rendering.
- Modify `src/styles/global.css`: lock the white theme and tighter global rhythm.
- Modify `tests/unit/site-data.test.ts`: canonical data and no-diagram source assertions.
- Modify `tests/e2e/navigation.spec.ts`: homepage structure, content, and route assertions.
- Modify `tests/e2e/responsive.spec.ts`: density, first-viewport, and overflow assertions.

---

### Task 1: Canonical Career Data

**Files:**
- Modify: `src/data/experience.ts`
- Test: `tests/unit/site-data.test.ts`

**Interfaces:**
- Produces: `experience`, `education`, and `training` readonly arrays. Every record exposes `period`, `title`, `organization`, `location`, `kind`, and `detail` where applicable.
- Consumes: the master CV reference named in Global Constraints.

- [ ] **Step 1: Write the failing canonical-data test**

Replace the current simplified date assertion and add training and missing-role assertions:

```ts
import { education, experience, training } from '../../src/data/experience';

expect(experience.map(({ period, title, organization }) => ({ period, title, organization }))).toEqual([
  { period: '03/2025-12/2025', title: 'Freelance AI & Data Engineer', organization: 'Self-Employed' },
  { period: '11/2023-01/2024', title: 'Student Research Assistant', organization: 'RWTH Aachen University' },
  { period: '11/2021-03/2022', title: 'Mobile Device Test Engineer Intern', organization: 'Dejet GmbH' },
  { period: '09/2019-12/2019', title: 'Test Engineer Intern', organization: 'Dongguan Switch Factory Co., Ltd.' },
]);
expect(training[0].period).toBe('03/2026-06/2026');
expect(education.map((item) => item.institution)).toEqual([
  'RWTH Aachen University',
  'University of Duisburg-Essen',
]);
```

- [ ] **Step 2: Run the test and confirm the intended failure**

Run: `npm test -- tests/unit/site-data.test.ts`

Expected: FAIL because the current data uses year-only periods, lacks the switchgear internship, and exports no `training` array.

- [ ] **Step 3: Implement the minimal canonical records**

Define a shared record shape and populate it only with verified CV content:

```ts
export interface CareerRecord {
  period: string;
  title: string;
  organization: string;
  location: string;
  kind: 'experience' | 'education' | 'training';
  detail?: string;
}
```

Use exact date ranges listed in the test. Keep education free of thesis titles and grades. Use concise CV-backed details for work and training.

- [ ] **Step 4: Run the unit test and confirm it passes**

Run: `npm test -- tests/unit/site-data.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the canonical data task**

```bash
git add src/data/experience.ts tests/unit/site-data.test.ts
git commit -m "fix: align portfolio timeline with master CV"
```

### Task 2: Compact Hero and Homepage Structure

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/components/SiteHeader.astro`
- Modify: `src/components/SiteFooter.astro`
- Test: `tests/e2e/navigation.spec.ts`

**Interfaces:**
- Consumes: `site` from `src/data/site.ts` and the existing section anchors.
- Produces: a hero with `id="about"`, `.hero-intro`, `.hero-actions`, and no `.hero-visual`; homepage sections ordered as `experience`, `work`, `skills`, and `contact` after the hero.

- [ ] **Step 1: Write the failing structure test**

```ts
test('home uses a compact identity-first structure without project diagrams', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main > section')).toHaveCount(5);
  await expect(page.locator('.hero-visual, .workflow')).toHaveCount(0);
  await expect(page.getByText('Traffic scenario', { exact: true })).toHaveCount(0);
  await expect(page.getByText('data foundation', { exact: true })).toHaveCount(0);
  await expect(page.locator('main h1')).toHaveText('Zhengjie');
  await expect(page.locator('#experience')).toBeVisible();
  await expect(page.locator('#work')).toBeVisible();
});
```

- [ ] **Step 2: Run the test and confirm the intended failure**

Run: `npx playwright test tests/e2e/navigation.spec.ts --grep "compact identity-first"`

Expected: FAIL because the hero imports `WorkflowDiagram`, displays road-traffic stages, and uses the statement rather than Zhengjie as the H1.

- [ ] **Step 3: Implement the identity-first hero**

Remove the `WorkflowDiagram` import and render only verified identity copy:

```astro
<section id="about" class="hero page-shell" aria-labelledby="hero-title">
  <p class="hero-kicker">AI &amp; Data Engineer</p>
  <h1 id="hero-title">Zhengjie</h1>
  <p class="hero-intro">I build applied AI, data workflows, and tested engineering software.</p>
  <div class="hero-actions">
    <a class="primary-link" href="#work">View projects</a>
    <a href={site.github}>GitHub</a>
    <a href={site.linkedin}>LinkedIn</a>
    <a href={site.email}>Email</a>
  </div>
</section>
```

Use a compact hero height and no empty right column.

- [ ] **Step 4: Recompose the page and shared shell**

In `index.astro`, render Hero, Experience, Work, Skills, and Contact in that order. Remove the `About` import and standalone section. Keep `id="experience"` and `id="work"`. Preserve the `About` navigation label and map it to the hero's `id="about"` anchor so the existing navigation contract remains valid. Keep `Work`, `About`, `Experience`, and GitHub on one desktop line. In the footer, use one `id="contact"` block with Email, LinkedIn, and GitHub.

- [ ] **Step 5: Run the focused browser test**

Run: `npx playwright test tests/e2e/navigation.spec.ts --grep "compact identity-first"`

Expected: PASS.

- [ ] **Step 6: Commit the homepage structure task**

```bash
git add src/components/Hero.astro src/components/SiteHeader.astro src/components/SiteFooter.astro src/pages/index.astro tests/e2e/navigation.spec.ts
git commit -m "feat: introduce compact portfolio structure"
```

### Task 3: Career Timeline Without Decorative Numbering

**Files:**
- Modify: `src/components/ExperienceTimeline.astro`
- Test: `tests/e2e/navigation.spec.ts`

**Interfaces:**
- Consumes: `experience`, `education`, and `training` from Task 1.
- Produces: `.career-list` containing CV-backed `.career-item` elements with `.career-period`, `.career-kind`, and `.career-content`; no `.timeline-index` or `.timeline-marker`.

- [ ] **Step 1: Write the failing timeline test**

```ts
test('career history is compact and has no decorative numbering', async ({ page }) => {
  await page.goto('/#experience');
  await expect(page.locator('#experience .career-item')).toHaveCount(7);
  await expect(page.locator('#experience .timeline-index, #experience .timeline-marker')).toHaveCount(0);
  await expect(page.getByText('Professional Training in Data Engineering and Databricks', { exact: true })).toBeVisible();
  await expect(page.getByText('Dongguan Switch Factory Co., Ltd.', { exact: true })).toBeVisible();
});
```

- [ ] **Step 2: Run the test and confirm the intended failure**

Run: `npx playwright test tests/e2e/navigation.spec.ts --grep "career history is compact"`

Expected: FAIL because current markup has five indexed timeline items and decorative markers.

- [ ] **Step 3: Implement the compact career list**

Combine and sort the three canonical arrays by explicit display order. Render date, plain kind label, title, organization, location, and short detail. Use a two-column desktop grid and a one-column mobile fallback. Use one divider between records and no numbered rail.

- [ ] **Step 4: Run the focused test**

Run: `npx playwright test tests/e2e/navigation.spec.ts --grep "career history is compact"`

Expected: PASS.

- [ ] **Step 5: Commit the timeline task**

```bash
git add src/components/ExperienceTimeline.astro tests/e2e/navigation.spec.ts
git commit -m "feat: simplify verified career history"
```

### Task 4: Compact Project Records Without Workflow Diagrams

**Files:**
- Modify: `src/components/ProjectFeature.astro`
- Modify: `src/components/MetricStrip.astro`
- Test: `tests/e2e/navigation.spec.ts`
- Test: `tests/e2e/responsive.spec.ts`

**Interfaces:**
- Consumes: the existing `CollectionEntry<'work'>` and `withBase()` helper.
- Produces: `.project-record` with `.project-main`, `.project-metrics`, `.project-tech`, and `.case-study-link`.

- [ ] **Step 1: Write the failing project-record test**

```ts
test('projects render as compact records with labelled verified metrics', async ({ page }) => {
  await page.goto('/#work');
  await expect(page.locator('#work .project-record')).toHaveCount(3);
  await expect(page.locator('#work .workflow, #work .project-media')).toHaveCount(0);
  await expect(page.getByText('sales transactions', { exact: true })).toBeVisible();
  await expect(page.getByText('simulation cases', { exact: true })).toBeVisible();
  await expect(page.getByText('held-out test-set accuracy', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View case study' })).toHaveCount(3);
});
```

- [ ] **Step 2: Run the test and confirm the intended failure**

Run: `npx playwright test tests/e2e/navigation.spec.ts --grep "projects render as compact"`

Expected: FAIL because ProjectFeature renders `.project-media` and `WorkflowDiagram`.

- [ ] **Step 3: Implement project records**

Delete the `WorkflowDiagram`, `stagesById`, media-column, and lead/band/compact variants from `ProjectFeature.astro`. Render one record layout:

```astro
<article class="project-record">
  <div class="project-main">
    <p class="project-meta">{project.data.role} / {project.data.period}</p>
    <h2>{project.data.title}</h2>
    <p class="summary">{project.data.summary}</p>
    <p class="project-tech">{project.data.technologies.slice(0, 6).join(' / ')}</p>
  </div>
  <MetricStrip metrics={project.data.metrics} />
  <a class="case-study-link" href={withBase(`/work/${project.id}`)}>View case study</a>
</article>
```

Keep each metric's value adjacent to its descriptive label. Use a compact grid with no blank media allocation.

- [ ] **Step 4: Update responsive assertions**

Replace obsolete `.hero-visual` and variant checks with:

```ts
await expect(page.locator('.hero-visual, .project-media, .workflow')).toHaveCount(0);
await expect(page.locator('.project-record')).toHaveCount(3);
```

- [ ] **Step 5: Run project and responsive tests**

Run: `npx playwright test tests/e2e/navigation.spec.ts tests/e2e/responsive.spec.ts`

Expected: PASS.

- [ ] **Step 6: Commit the project-record task**

```bash
git add src/components/ProjectFeature.astro src/components/MetricStrip.astro tests/e2e/navigation.spec.ts tests/e2e/responsive.spec.ts
git commit -m "feat: replace workflow diagrams with project records"
```

### Task 5: White Theme, Skills, and Density Pass

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/CapabilitiesGrid.astro`
- Modify: `src/pages/index.astro`
- Test: `tests/unit/site-data.test.ts`
- Test: `tests/e2e/responsive.spec.ts`

**Interfaces:**
- Consumes: existing `capabilities` data and semantic theme variables.
- Produces: a light-only white-dominant theme, compact `.page-section` rhythm, and grouped skill lists without scores.

- [ ] **Step 1: Write the failing white-theme test**

```ts
it('locks the portfolio to a compact white theme without diagram styling', () => {
  expect(globalStyles).toContain('--surface: #f8fafb');
  expect(globalStyles).toContain('--surface-raised: #ffffff');
  expect(globalStyles).not.toContain('@media (prefers-color-scheme: dark)');
  expect(globalStyles).not.toContain('.workflow');
});
```

Add a browser density assertion:

```ts
test('desktop home presents the next section within a compact scroll distance', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const experienceTop = await page.locator('#experience').evaluate((element) => element.getBoundingClientRect().top);
  expect(experienceTop).toBeLessThan(900);
});
```

- [ ] **Step 2: Run the tests and confirm the intended failures**

Run: `npm test -- tests/unit/site-data.test.ts`

Run: `npx playwright test tests/e2e/responsive.spec.ts --grep "compact scroll distance"`

Expected: FAIL because the global theme still switches to dark and the current hero/section spacing consumes too much vertical space.

- [ ] **Step 3: Implement the theme and spacing tokens**

Set semantic variables near these values:

```css
:root {
  --surface: #f8fafb;
  --surface-raised: #ffffff;
  --ink: #17202a;
  --muted: #586474;
  --rule: #d7dee5;
  --accent: #176b96;
}
```

Remove automatic dark-theme overrides because the user explicitly requested white as the main theme. Preserve reduced-motion handling. Reduce section padding to a consistent `clamp(3rem, 6vw, 5.5rem)` maximum and avoid large empty media regions.

- [ ] **Step 4: Simplify the skills presentation**

Render four grouped lists from `capabilities` in a compact two-column desktop grid and one-column mobile grid. Keep tool names as plain text. Do not add progress percentages, icons, or equal-height marketing cards.

- [ ] **Step 5: Run unit and responsive tests**

Run: `npm test`

Run: `npx playwright test tests/e2e/responsive.spec.ts`

Expected: PASS.

- [ ] **Step 6: Commit the visual-density task**

```bash
git add src/styles/global.css src/components/CapabilitiesGrid.astro src/pages/index.astro tests/unit/site-data.test.ts tests/e2e/responsive.spec.ts
git commit -m "style: tighten white portfolio presentation"
```

### Task 6: Full Verification and Visual Review

**Files:**
- Modify only files required to fix failures discovered by verification.

**Interfaces:**
- Consumes: all completed tasks.
- Produces: a verified static build and a local preview matching the approved design.

- [ ] **Step 1: Audit visible copy and forbidden patterns**

Run:

```powershell
rg -n "WorkflowDiagram|Traffic scenario|data foundation|timeline-index|timeline-marker|—|–|Bosch|full legal name" src
```

Expected: no forbidden homepage output or invented identity claims. References inside unused component files are acceptable only if the component is not imported by the homepage; prefer removing dead imports and dead CSS.

- [ ] **Step 2: Run the complete automated verification**

Run: `npm run check`

Run: `npm test`

Run: `npm run test:e2e`

Run: `npm run build`

Run: `git diff --check`

Expected: all commands exit successfully. Existing Astro/Zod deprecation hints may remain if they are unchanged and do not produce warnings or errors from the modified UI.

- [ ] **Step 3: Review desktop and mobile visuals**

Open local `/`, `/#experience`, and `/#work` at 1440x900 and 390x844. Confirm:

- white theme remains consistent across the page;
- hero identity and primary action fit within the first viewport;
- experience begins within one desktop viewport;
- no workflow diagram or numbered process strip is visible;
- project rows contain no large blank media column;
- dates, project metrics, and university names are legible;
- navigation stays one line at desktop;
- mobile has no horizontal overflow.

- [ ] **Step 4: Commit any verification fixes**

```bash
git add src/components/Hero.astro src/components/ExperienceTimeline.astro src/components/ProjectFeature.astro src/components/MetricStrip.astro src/components/CapabilitiesGrid.astro src/components/SiteHeader.astro src/components/SiteFooter.astro src/data/experience.ts src/pages/index.astro src/styles/global.css tests/unit/site-data.test.ts tests/e2e/navigation.spec.ts tests/e2e/responsive.spec.ts
git commit -m "fix: complete compact portfolio QA"
```

- [ ] **Step 5: Report local completion without publishing**

Report the local preview URL and verification results. Do not push, open a pull request, rewrite history, or deploy unless Zhengjie explicitly requests those external actions in a later message.
