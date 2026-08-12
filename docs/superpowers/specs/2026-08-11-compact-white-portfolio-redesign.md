# Compact White Portfolio Redesign

## Goal

Redesign Zhengjie's portfolio as a compact, recruiter-focused AI and data engineering portfolio. Use the structural clarity of the supplied reference site without copying its dark sci-fi styling. The finished site uses a white-dominant theme, dense information hierarchy, restrained cold-blue accents, and only facts verified in the complete master CV.

## Source of truth

All biographical, education, employment, project, metric, date, and technology claims must be verified against:

`C:\Users\fiend\.codex\.chatgpt-projects\g-p-69eca5ad746c81918abde46902d2d6cf\sources\Zhengjie_Yuan_Master_CV_Reference_2026.08.09_v8(1).txt`

Files under `sources/` are read-only. The public display name remains `Zhengjie`. No Bosch role or any other unverified experience may appear.

## Design direction

- Page type: personal engineering portfolio for recruiters and hiring managers.
- Visual language: compact technical editorial layout, inspired by the reference site's direct hierarchy and section order.
- Theme: white and cool off-white surfaces, near-black text, muted gray supporting text, one cold-blue accent.
- Design variance: 5. Structured with mild asymmetry, not experimental.
- Motion intensity: 3. Static by default with concise hover and focus feedback.
- Visual density: 7. Short section gaps and high information value per viewport.
- Shape system: mostly square surfaces with a small consistent radius only where a bordered container needs separation.

## Information architecture

Keep the existing routes, project slugs, anchor IDs, navigation labels, keyboard navigation, and case-study pages. Recompose the homepage in this order:

1. Hero
2. Experience and education
3. Selected projects
4. Skills
5. Contact

The standalone About section is removed. Its useful content is condensed into the hero introduction. This reduces repetition and unnecessary page length.

## Hero

The hero fits within the first desktop viewport and has no project-specific workflow diagram.

Content:

- Zhengjie
- AI & Data Engineer
- A concise CV-backed description of applied AI, data workflows, testing, and engineering work
- Primary action: view projects
- Compact links for GitHub, LinkedIn, and email

The hero must not show road-traffic stages, Bakery AI stages, numbered process steps, fake dashboards, decorative technical diagrams, or information from another project. A personal photo is not introduced because no approved portrait asset is currently part of the project.

## Experience and education

Use a compact chronological layout without decorative item numbers. Dates form a narrow left column; verified role, organization, location, and short description form the main column. Work, education, and professional training are identified with plain text labels.

The content is sourced from the master CV and may include:

- Professional Training in Data Engineering and Databricks, 03/2026-06/2026
- Freelance AI & Data Engineer, 03/2025-12/2025
- M.Sc. Computer Engineering, RWTH Aachen University, 10/2021-12/2024
- Student Research Assistant, RWTH Aachen University, 11/2023-01/2024
- Mobile Device Test Engineer Intern, Dejet GmbH, 11/2021-03/2022
- B.Sc. Electrical and Electronic Engineering, University of Duisburg-Essen, 10/2014-10/2021
- Test Engineer Intern, Dongguan Switch Factory Co., Ltd., 09/2019-12/2019

Thesis titles and grades remain outside Education. Thesis projects stay in Selected Projects.

## Selected projects

Use three compact horizontal project records. Each record contains:

- Project title
- Role and verified date range
- One concise summary
- Up to three clearly labelled, verified results or scope metrics
- A short technology list
- A link to the existing case study

The three projects are:

1. Bakery AI Analytics
2. Plausible Road Traffic Auralization
3. Spoken Digit Classification with CNNs

The numerical workflow diagrams are removed from the hero and all project records. Do not replace them with fake screenshots or unverified graphics. Verified metrics are allowed because each number has an explicit label and communicates real project scope or results.

Project records are separated by restrained whitespace and one group-level rule system. They do not use large empty media columns.

## Skills

Present verified skills in compact grouped lists. Do not use proficiency percentages, progress bars, or visual scoring. The groupings remain practical and CV-backed:

- Applied AI
- Machine learning
- Data engineering and analytics
- Software, testing, and engineering tools

## Contact and footer

Use one compact contact block with email, LinkedIn, and GitHub. Avoid a second marketing call to action with the same intent. The footer remains minimal and contains no version number, build label, weather, location decoration, or artificial status indicator.

## Spacing and responsive behavior

- Reduce homepage section padding from the current large `clamp()` values to a denser rhythm.
- Avoid full-screen sections after the hero.
- Desktop content uses a centered maximum-width container with compact horizontal splits.
- Below 768 px, every split becomes a single column with readable 16 px minimum body text and no horizontal overflow.
- Long project titles may wrap naturally on small screens but should not be forced into narrow desktop columns.

## Accessibility and content safeguards

- Preserve the skip link, semantic landmarks, heading hierarchy, keyboard focus, and visible focus states.
- Maintain WCAG AA contrast for body copy and interactive elements.
- Keep desktop navigation on one line.
- Use regular hyphens for date ranges and separators.
- Do not use unexplained decorative numbering.
- Do not show unpublished client screenshots or identifying client data.

## Testing and acceptance criteria

Automated checks must prove that:

- The homepage contains no workflow diagram and no six-step numbered process strip.
- The hero contains Zhengjie's identity and no project-specific stage labels.
- The three verified projects remain linked to their existing case-study routes.
- Experience, education, and training facts match the master CV.
- The page has no narrow-viewport horizontal overflow.
- Desktop project titles are not constrained into unnecessarily narrow columns.
- Existing routes and navigation continue to work.
- Type checks, unit tests, browser tests, and the production build pass.

Visual review must confirm that the first viewport is compact, section gaps are substantially reduced, the page is consistently white-dominant, and no decorative numbered workflow remains.

## Out of scope

- Adding new projects not present in the master CV
- Publishing private client assets
- Creating invented screenshots or metrics
- Changing project URLs or GitHub Pages deployment settings
- Adding a portrait without an approved user-provided image
