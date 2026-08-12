# Engineering Portfolio Visual Redesign

## Goal

Refresh Zhengjie's portfolio into a calm, modern engineering archive while preserving all existing facts, routes, links, navigation labels, and accessibility semantics.

## Design Read

An AI and data engineer portfolio for recruiters, using a restrained technical-archive aesthetic with a dark graphite base, one ice-blue accent, asymmetrical layouts, and purposeful motion.

## Visual System

- Theme: dark graphite surface with an automatic light-mode counterpart.
- Accent: one low-saturation ice blue for interactive and data-highlight elements.
- Typography: a contemporary sans-serif display stack paired with a monospace stack for dates, metrics, and labels.
- Shape rule: compact 12px surfaces, pill-only controls.
- Motion: CSS opacity and transform transitions for entry and hover feedback. All motion is disabled under `prefers-reduced-motion`.

## Page Composition

- Home hero becomes an asymmetric two-column composition. The message and primary work link stay above the fold. The right side uses the existing project-workflow visual rather than an invented dashboard.
- The three project features become an asymmetric archive grid. Each item retains its existing case-study link, real metric data, and image alt text.
- About, capabilities, and footer preserve their current content and anchors, but receive the new type scale, spacing, and token system.
- Experience becomes a vertical timeline: one continuous left-side rule, one date marker per role, and role content on the right. This replaces the current table-like horizontal rows.
- Case-study routes keep their slugs and content structure but inherit the new visual tokens and component rhythm.

## Constraints

- Do not alter public claims, dates, employers, projects, metrics, URLs, anchors, or route slugs.
- Do not introduce invented client work, logos, testimonials, or numerical claims.
- Use no em dash characters in visible copy.
- Keep keyboard navigation, skip link, focus styles, responsive behavior, and reduced-motion support intact.
- Use existing first-party workflow visuals. Do not introduce fake dashboard imagery or generic stock photography.

## Validation

- Add regression coverage asserting the experience section exposes timeline semantics and remains reachable by the existing `#experience` anchor.
- Run Astro type/content checking, unit tests, browser tests, and a production build.
- Verify desktop and narrow mobile layouts, both color schemes, reduced-motion behavior, and no serious accessibility violations.
