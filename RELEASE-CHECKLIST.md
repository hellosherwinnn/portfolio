# Portfolio V1 release checklist

Verified locally on 2026-08-11. Publication is intentionally out of scope.

## Routes and links

- [x] Home and all three case-study routes build and return their expected content.
- [x] Home, GitHub, LinkedIn, and email targets use the canonical public values.
- [x] The CV link is deliberately hidden because no approved public CV PDF was supplied.
- [x] All internal project and previous/next links resolve, including the GitHub Pages `/portfolio/` base path.
- [x] The 404 page returns visitors to selected work.

## Facts and privacy

- [x] Bakery facts match the Master CV: approximately 116,000 transactions, 7 sources, 4 KPIs, 13 visualizations, 500 daily observations, seven-day net-profit forecast, and 14.4% WMAPE.
- [x] No Bakery screenshot or client asset is bundled; visuals remain withheld pending anonymization, so no identifying business information is exposed.
- [x] The auralization study states 288 cases as 4 speeds × 6 intervals × 6 overlaps × 2 crossfading methods.
- [x] The CNN case distinguishes 96.43% held-out test accuracy from the later 88.0%/89.5% live-microphone validation.
- [x] Student Research Assistant wording follows the official-reference scope: network communication, C++ unit tests, and Python-interface structure.
- [x] No Bosch role or any other non-canonical employment claim appears in the site source.

## Accessibility and responsive behavior

- [x] No serious or critical axe violations on the home page or three case studies.
- [x] Keyboard focus begins at the skip link and remains visibly outlined through primary navigation.
- [x] Reduced-motion preference removes meaningful transition duration and smooth scrolling.
- [x] Workflow visuals have accessible labels; no unlabelled content image is shipped.
- [x] No horizontal overflow at 360, 390, 430, 768, 1024, 1280, 1440, or 1920 px.
- [x] Mobile primary targets are at least 44 px high and header links follow a logical tab order.

## Design and performance

- [x] The design avoids the rejected generic patterns: avatar hero, AI gradient, neon, blobs, glassmorphism, equal project-card grid, logo wall, terminal gimmick, marquee, cursor follower, magnetic buttons, parallax, large shadows, and repeated identical project layouts.
- [x] One restrained accent color is used; project layouts deliberately vary in composition.
- [x] The static production output ships no client JavaScript or animation library.
- [x] The only bundled public asset is the 225-byte SVG favicon; there are no outstanding image-size concerns.
- [x] The local production preview loads its styles, has no console errors, and has no horizontal overflow.

## Quality gate

- [x] Clean dependency installation succeeds with no reported vulnerabilities.
- [x] Astro check completes with 0 errors and 0 warnings; 22 upstream deprecation hints are recorded as non-blocking.
- [x] Unit/content tests pass.
- [x] Browser, accessibility, keyboard, responsive, and reduced-motion tests pass.
- [x] Static build produces all five HTML pages (home, three case studies, and 404).
